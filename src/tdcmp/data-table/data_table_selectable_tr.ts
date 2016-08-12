import {Component, Output, Input, EventEmitter, Inject, Optional, forwardRef
  , ElementRef, AfterContentInit, ViewEncapsulation} from '@angular/core';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {MdDataTable} from './data_table';

/**
 * MdDataTable row
 */
export interface ITableSelectableRow {
  selectableValue: string;
  onChange: EventEmitter<ITableSelectableRowSelectionChange>;
  isActive: boolean;
  change: (event: any) => void;
  ngAfterContentInit: () => void;
}

/**
 * Selectable change event data
 */
export interface ITableSelectableRowSelectionChange {
  name: string;
  target: ITableSelectableRow;
  isActive: boolean;
  selectableValue: string;
}

export abstract class AbstractMdDataTableSelectableRow
    implements AfterContentInit, ITableSelectableRow {
  @Input('selectable-value') selectableValue: string;
  @Output() onChange: EventEmitter<ITableSelectableRowSelectionChange>
    = new EventEmitter<ITableSelectableRowSelectionChange>(false);
  isActive: boolean = false;

  constructor(@Optional()
              @Inject(forwardRef(() => MdDataTable))
              public table: MdDataTable, protected _element: ElementRef) {
    this.onChange.share();
  }

  /**
   * Change active status
   */
  change(event) {
    if (event.target.classList.contains('md-checkbox-inner-container')) {
      event.preventDefault();
    }

    this.isActive = !this.isActive;

    let changeEvent: ITableSelectableRowSelectionChange = {
      name: 'selectable_row_change',
      target: this,
      isActive: this.isActive,
      selectableValue: this.selectableValue
    };
    this.onChange.emit(changeEvent);
  }

  ngAfterContentInit() {}
}

@Component({
  selector: 'tr[md-data-table-header-selectable-row]',
  template: `
        <th class="md-data-check-cell">
            <md-checkbox [checked]="isActive"></md-checkbox>
        </th>
        <ng-content></ng-content>
    `,
    styles: [require('./data_table.scss')],
    encapsulation: ViewEncapsulation.None,
  host: {
    '[class.active]': 'isActive',
    '(click)': 'change($event)'
  }
})
export class MdDataTableHeaderSelectableRow extends AbstractMdDataTableSelectableRow {
  constructor(@Optional()
              @Inject(forwardRef(() => MdDataTable))
              public table: MdDataTable, protected _element: ElementRef) {
    super(table, _element);
  }

  _bindListener(): void {
    this.table.onSelectableChange
      .map(event => event.allSelected)
      .subscribe(newActiveStatus => this.isActive = newActiveStatus);
  }

  ngAfterContentInit() {
    if (!!this.table) {
      this._bindListener();
    }
  }
}

@Component({
  selector: 'tr[md-data-table-selectable-row]',
  template: `
        <td class="md-data-check-cell">
          <md-checkbox [checked]="isActive"></md-checkbox>
        </td>
        <ng-content></ng-content>
    `,
    styles: [require('./data_table.scss')],
    encapsulation: ViewEncapsulation.None,
  host: {
    '[class.active]': 'isActive',
    '(click)': 'change($event)'
  }
})
export class MdDataTableSelectableRow extends AbstractMdDataTableSelectableRow {
  constructor(@Optional()
              @Inject(forwardRef(() => MdDataTable))
              public table: MdDataTable, protected _element: ElementRef) {
    super(table, _element);
  }

  /**
   * @param {any} element
   *
   * @returns {string}
   */
  _getIndex(element): string {
    return Array.prototype.indexOf.call(element.parentNode.children, element).toString();
  }

  _bindListener(): void {
    this.table.onSelectableChange
      .map(event => {
        return event.values !== undefined &&
          event.values.length &&
          (event.values.findIndex((value: string) => value === this.selectableValue)) !== -1;
      })
      .subscribe(newActiveStatus => this.isActive = newActiveStatus);
  }

  ngAfterContentInit() {
    let element = this._element.nativeElement;
    if (this.selectableValue === undefined) {
      this.selectableValue = this._getIndex(element);
    }

    if (!!this.table) {
      this._bindListener();
    }
  }
}
