import {Component, Input, Output, EventEmitter, ContentChild, ContentChildren
  , QueryList, AfterContentInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import 'rxjs/add/operator/share';
import {MdDataTableHeaderSelectableRow, MdDataTableSelectableRow
  , ITableSelectableRowSelectionChange} from './data_table_selectable_tr';

export * from './data_table_selectable_tr';

/**
 * Selectable change event data
 */
export interface ITableSelectionChange {
  name: string;
  allSelected: boolean;
  values: any[];
}

@Component({
  selector: 'md-data-table',
  template: `<ng-content></ng-content>`,
  directives: [MdDataTableHeaderSelectableRow, MdDataTableSelectableRow],
  styles: [require('./data_table.scss')],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.md-data-table]': 'true',
    '[class.md-data-table-selectable]': 'selectable'
  }
})
export class MdDataTable implements AfterContentInit, OnDestroy {
  @Input()
  selectable: boolean;
  @Output()
  onSelectableAll: EventEmitter<any> = new EventEmitter(false);
  @Output()
  onSelectableChange: EventEmitter<any> = new EventEmitter(false);

  @ContentChild(MdDataTableHeaderSelectableRow)
  _masterRow: MdDataTableHeaderSelectableRow;

  @ContentChildren(MdDataTableSelectableRow, true)
  _rows: QueryList<MdDataTableSelectableRow>;

  _listeners: EventEmitter<any>[] = [];

  selected: Array<string> = [];

  constructor() {
    this.onSelectableChange.share();
  }

  change(event: ITableSelectableRowSelectionChange) {
    let outputEvent: ITableSelectionChange = {
      name: 'selectable_change',
      allSelected: false,
      values: []
    };
    if (event.target instanceof MdDataTableHeaderSelectableRow === true) {
      if (event.isActive === true) {
        outputEvent.allSelected = true;
        outputEvent.values = this._getRowsValues();
      }
    } else {
      outputEvent.values = this.selected.slice(0);

      if (event.isActive === true) {
        outputEvent.values.push(event.selectableValue);
      } else {
        let index = outputEvent.values.indexOf(event.selectableValue);
        if (index !== -1) {
          outputEvent.values.splice(index, 1);
        }
      }
    }

    // dispatch change
    this.selected = outputEvent.values;
    this.onSelectableChange.emit(outputEvent);
  }

  /**
   * @returns {Array<string>}
   */
  _getRowsValues(): any[] {
    return this._rows.toArray()
      .map((tr: MdDataTableSelectableRow) => tr.selectableValue);
  }

  _unsubscribeChildren() {
    this.selected = [];
    if (this._listeners.length) {
      this._listeners.forEach(listener => {
        listener.unsubscribe();
      });
      this._listeners = [];
    }
  }

  _updateChildrenListener(list: QueryList<MdDataTableSelectableRow>) {
    this._unsubscribeChildren();

    list.toArray()
      .map((tr: MdDataTableSelectableRow) => {
        tr.onChange.subscribe(this.change.bind(this));
      });
  }

  ngAfterContentInit() {
    if (this.selectable === true) {
      if (!!this._masterRow) {
        this._masterRow.onChange.subscribe(this.change.bind(this));
      }

      this._rows.changes.subscribe(this._updateChildrenListener.bind(this));
      this._updateChildrenListener(this._rows);
    }
  }

  ngOnDestroy() {
    this._unsubscribeChildren();
  }

}
