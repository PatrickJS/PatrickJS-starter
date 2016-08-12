import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'tdcombobox',
  template: require('./tdcombobox.html'),
  styles: [require('./tdcombobox.scss')]
})

export class TdComboBox {
  @Input() displayMember: string;
  @Input() placeholder: string;
  @Output() selectedItemChanged = new EventEmitter();
  @Output() inputChanged = new EventEmitter();
  _selectedItem: any;
  visible: boolean = false;
  _selectedItemName: string = undefined;
  inputChangedTimer: any;
  _items: any = undefined;
  _searchlist: Element;
  @Input()
  get items() {
    return this._items;
  }
  set items(value: any) {
    if (value && value.length > 0) {
      this._items = value;
      this.visible = true;
    } else {
      this.visible = false;
    }
  }

  @Input()
  get selectedItem() {
    return this._selectedItem;
  }
  set selectedItem(value: any) {
    if (value === undefined) {
      this._selectedItemName = '';
    } else {
      this._selectedItem = value;
      this._selectedItemName = this.displayMember ? value[this.displayMember] : value;
      this.selectedItemChanged.emit(this.selectedItem);
    }
  }

  get selectedItemName () {
    return this._selectedItemName;
  }
  set selectedItemName(value: string) {
    clearTimeout(this.inputChangedTimer);
    this._selectedItemName = value;
    this.inputChangedTimer = setTimeout(() => {
       this.inputChanged.emit(value); }, 100 );
  }

  @HostListener('body:click', ['$event'])
  closeSearch($event: MouseEvent) {
    if (!this._searchlist) {
      this._searchlist = document.getElementsByClassName('tdcombobox')[0];
    }
    if (this.visible &&
      !this.isInElement(this._searchlist, $event.clientX, $event.clientY)) {
      this.items = [];
    }
    if (!this.visible &&
      this.isInElement(this._searchlist, $event.clientX, $event.clientY)) {
        this.inputChangedTimer = setTimeout(() => {
        this.inputChanged.emit(''); }, 100 );
      }
  }
  isInElement(element, x, y): boolean {
     let rect = element.getBoundingClientRect();
     return rect.top <= y &&
       y <= rect.top + rect.height &&
       rect.left <= x &&
       x <= rect.left + rect.width;
   }

  onBlur() {
    setTimeout(() => {
      this.visible = false;
    }, 100 );
  }

  selectItem(item) {
    this.visible = false;
    this.selectedItem = item;
    this.selectedItemChanged.emit(this.selectedItem);
  }
}
