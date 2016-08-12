import * as _ from 'lodash';

import {Component, Input, Output, EventEmitter, HostListener, HostBinding
  , ElementRef, OnInit, OnDestroy, Renderer, forwardRef, ViewEncapsulation } from '@angular/core';
import {BooleanFieldValue} from '@angular2-material/core/annotations/field-value';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  NgModel
} from '@angular/forms';


export const MD_SELECT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MdSelect),
  multi: true
};
const noop = () => { };

@Component({
  selector: 'md-select',
  template: require('./select.html'),
  styles: [require('./select.scss')],
  providers: [MD_SELECT_CONTROL_VALUE_ACCESSOR],
  directives: [],
  encapsulation: ViewEncapsulation.None
})
export class MdSelect implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() placeHolder: string;
  @Input() @BooleanFieldValue() required: boolean = false;
  @Input() items: Array<any>;
  @Input() displayItem: string = undefined;
  @Input() get selectedItem(): any {
    return this._selectedItem;
  }
  set selectedItem(value) {
    this._selectedItem = value;
    if (this._initialized) {
      this.selectedItemChange.emit(this._selectedItem);
      if (!this.valuePropertyName) this._onChangeCallback(value);
    } else this._initialized = true;
  }

  @Input() get selectedItems(): Array<any> {
    return this._selectedItems;
  }
  set selectedItems(value) {
    this._selectedItems = value;
    if (this._initialized) {
      this.selectedItemsChange.emit(this._selectedItems);
      if (!this.valuePropertyName) this._onChangeCallback(value);
    } else this._initialized = true;
  }


  @Output() selectedItemChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectedItemsChange: EventEmitter<any> = new EventEmitter<any>();

  @Input() valuePropertyName: string = undefined;
  @Input() get selectedValue(): any {
    return this._selectedValue;
  }
  set selectedValue(value) {
    this._selectedValue = value;
    this.selectedItem = this.findItemByValue(value);
    this.selectedValueChange.emit(this._selectedValue);
    if (this.valuePropertyName) this._onChangeCallback(value);
  }
  @Output() selectedValueChange: EventEmitter<any> = new EventEmitter<any>();

  @Input() get selectedValues(): any {
    return this._selectedValues;
  }
  set selectedValues(values) {
    this._selectedValues = values;
    this.findItemsByValue(this.selectedItems, values);
    this.selectedValuesChange.emit(this._selectedValues);
    if (this.valuePropertyName) this._onChangeCallback(values);
  }
  @Output() selectedValuesChange: EventEmitter<any> = new EventEmitter<any>();


  @HostBinding('attr.disabled')
  @Input('disabled')
  get disabled() { return this._disabled; }

  set disabled(value: boolean) {
    // The presence of *any* disabled value makes the component disabled, *except* for false.
    this._disabled = (value !== undefined && value !== false) ? true : false;
  }
  _disabled: boolean = false;

  @HostBinding('attr.clearable')
  @Input('clearable')
  get clearable() { return this._clearable; }
  set clearable(value: boolean) {
    this._clearable = (value !== undefined && value !== false) ? true : false;
  }
  _clearable: boolean = false;

  @HostBinding('attr.hidedivider')
  @Input('hidedivider')
  get hidedivider() { return this._hidedivider; }
  set hidedivider(value: boolean) {
    this._hidedivider = (value !== undefined && value !== false) ? true : false;
  }
  _hidedivider: boolean = false;

  _multi: boolean = false;
  @HostBinding('attr.multi')
  @Input('multi')
  get multi() { return this._multi; }
  set multi(value: boolean) {
    this._multi = (value !== undefined && value !== false) ? true : false;
  }



  _search: boolean = false;
  @HostBinding('attr.search')
  @Input('search')
  get search() { return this._search; }
  set search(value: boolean) {
    this._search = (value !== undefined && value !== false) ? true : false;
  }

  searchTerm: string;

  private _selectedItem: any;
  private _selectedItems: Array<any> = [];
  private _selectedValue: any;
  private _selectedValues: Array<any> = [];
  private showPopup: boolean = false;
  private _overlay: Element;
  private _popupElement: Element;
  private _inputElement: Element;
  private active: boolean = false;
  private _justClicked: boolean = false;
  private _justOpened: boolean = false;
  private upper: boolean = false;
  private _initialized = false;

  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;
  private sortedItems: Array<any>;

  sortItems(items: Array<any>): Array<any> {
    if (!this.multi) return items;
    let arr = [];
    this.selectedItems.forEach(p => {
      if (items.indexOf(p) !== -1) arr.push(p);
    });
    items.forEach(p => {
      if (this.selectedItems.indexOf(p) === -1) arr.push(p);
    });
    return arr;
  }

  get filteredItems(): Array<any> {
    if (!this.searchTerm || this.searchTerm === '')
      return this.sortedItems;
    return this.sortedItems.filter(p => {
      return p[this.displayItem].toUpperCase().indexOf(this.searchTerm.toUpperCase()) >= 0;
    }
    );
  }


  @HostListener('body:click', ['$event'])
  closePopup() {
    if (!this.showPopup) return;
    if (this._justClicked) {
      this._justClicked = false;
      return;
    }
    this.active = false;
    setTimeout(() => {
      this.showPopup = false;
    }, 100);
  }

  constructor(private _element: ElementRef, private _renderer: Renderer) { }

  ngOnInit() {
    if (this.valuePropertyName && this.selectedValue && !this.selectedItem)
      this.selectedItem = this.findItemByValue(this.selectedValue);

    this._overlay = document.getElementsByClassName('md-overlay-container')[0];
    this._popupElement = this._element.nativeElement.getElementsByClassName('popup')[0];
    this._inputElement = this._element.nativeElement.getElementsByClassName('inputpopup')[0];
    this._overlay.appendChild(this._popupElement);
  }

  findItemByValue(value: any): any {
    for (let item of this.items) {
      if (item[this.valuePropertyName] === value) {
        return item;
      }
    }

    return undefined;
  }

  findItemsByValue(result: Array<any>, values: Array<any>) {
    while (result.pop());

    for (let value of values) {
      result.push(this.findItemByValue(value));
    }
  }

  setPosition() {
    let rec = this._inputElement.getBoundingClientRect();

    let height: number = 32.0;
    if (this.items) height = (this.items.length * 32.0) + 32.0;
    if (height > 500) height = 500;
    let wh = window.innerHeight;

    if (rec.bottom + height - 100 < wh) {
      this._renderer.setElementStyle(this._popupElement, 'top', rec.bottom - 55 + 'px');
      this._renderer.setElementStyle(this._popupElement, 'left', rec.left + 'px');
      this.upper = false;
      return;
    }

    if (rec.bottom > height) {
      this._renderer.setElementStyle(this._popupElement, 'top', rec.bottom - height + 'px');
      this._renderer.setElementStyle(this._popupElement, 'left', rec.left + 'px');
      this.upper = true;
      return;
    }
    this.upper = false;
    this._renderer.setElementStyle(this._popupElement, 'top', '30px');
    this._renderer.setElementStyle(this._popupElement, 'left', '50%');
  }

  openPopup() {
    this.sortedItems = this.sortItems(this.items);
    this._justOpened = true;
    this.setPosition();
    this.showPopup = true;
    setTimeout(() => {
      this.active = true;
      if (!this._multi) this.scrollToSelected();
    }, 10);
  }


  scrollToSelected() {
    if (!this.selectedItem) return;
    let pos = this.items.indexOf(this.selectedItem) + 1;
    if (this.upper)
      this._popupElement.firstElementChild.scrollTop = pos * 32 - 470; else
      this._popupElement.firstElementChild.scrollTop = pos * 32 - 48;
  }

  getDisplayItem(item: any): string {
    if (!item) return '';
    if (this.displayItem)
      return item[this.displayItem];
    return item.toString();
  }

  getDisplayItemLabel(): string {
    if (!this.multi) return this.getDisplayItem(this.selectedItem);
    let text = '';
    this.selectedItems.forEach(p => {
      text += this.getDisplayItem(p) + ', ';
    });
    if (text !== '') text = text.replace(new RegExp(', *$'), '');
    return text;
    // if (this.selectedItems.length === 0) return '';
    // if (this.selectedItems.length === 1) return this.getDisplayItem(this.selectedItems[0]);
    // if (this.selectedItems.length === 2) return this.getDisplayItem(this.selectedItems[0])
    //   + ', ' + this.getDisplayItem(this.selectedItems[1]);
    // return this.getDisplayItem(this.selectedItems[0])
    //   + ', ' + this.getDisplayItem(this.selectedItems[1]) + ', ...';
  }

  clicked($event) {
    if (this.disabled) return;
    if (this._justClicked) {
      this._justClicked = false;
      return;
    }
    this._justClicked = true;
    this.openPopup();
  }

  itemClicked(item) {
    this.selectedItem = item;
    if (this.valuePropertyName)
      this.selectedValue = item[this.valuePropertyName];
    this.closePopup();
  }
  ngOnDestroy() {
    this._overlay.removeChild(this._popupElement);
  }

  clear() {
    this._justClicked = true;
    if (this.valuePropertyName)
      this.selectedValue = undefined; else this.selectedItem = undefined;
  }

  writeValue(value: any) {
    // if valuePropertyName specified, we bind using id
    if (this.valuePropertyName) {
      if (this.multi) this.selectedValues = value; else this.selectedValue = value;
    } else {
      if (this.multi) this.selectedItems = value; else this.selectedItem = value;
    }
  }

  registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }



  checkClicked(item: any, checked: boolean) {
    if (checked) {
      if (this.valuePropertyName) this.selectedValues.push(item[this.valuePropertyName]);
        this.selectedItems.push(item);
    } else {
      if (this.valuePropertyName) {
        let index = this.selectedValues.indexOf(item[this.valuePropertyName]);
        if (index !== -1) this.selectedValues.splice(index, 1);
      }
      let index = this.selectedItems.indexOf(item);
      if (index !== -1) this.selectedItems.splice(index, 1);

    }
    if (this.valuePropertyName) this._onChangeCallback(this.selectedValues); else
      this._onChangeCallback(this.selectedItems);
    this.selectedItemsChange.emit(this._selectedItems);
  }

  isChecked(item: any): boolean {
    if (this.valuePropertyName) {
      return this.selectedValues.indexOf(item[this.valuePropertyName]) !== -1;
    } else return this.selectedItems.indexOf(item) !== -1;
  }
}

export const MD_SELECT_DIRECTIVES: any[] = [MdSelect];
