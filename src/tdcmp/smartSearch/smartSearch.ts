import {Component, ViewEncapsulation, Input, Output, EventEmitter
  , AfterViewInit, ElementRef, Renderer, HostListener, OnDestroy} from '@angular/core';
import {Dictionary} from '../tools/dictionary';

@Component({
  selector: 'smart-search',
  template: require('./smartSearch.html'),
  styles: [require('./smartSearch.scss')],
  encapsulation: ViewEncapsulation.None
})
export class SmartSearch implements AfterViewInit, OnDestroy {
  @Input() public keys: {
    [key: string]: (text: string
      , filters: { [key: string]: string }) => Array<string>
  };
  @Input() public text: string;
  @Input() public dico: Dictionary = new Dictionary([]);
  @Output() filterChange: EventEmitter<{ [key: string]: string }> =
  new EventEmitter<{ [key: string]: string }>();

  public filters: { [key: string]: string } = {};

  private _items: Array<string> = [];

  private get _suggestion(): string {
    if (!this._lockedKey) {
      if (!this._key) return undefined;
      if (!this.text) return this._key;
      return this._key.substring(this.text.length);
    } else {
      if (!this._candidate) return undefined;
      if (!this._value) return this._candidate;
      return this._candidate.substring(this._value.length);
    }
  }

  private _key: string;
  private _lockedKey: string;

  private get _value(): string {
    if (!this.text || !this._lockedKey) return undefined;
    return this.text.substring((this._lockedKey + ': ').length);
  }

  private get _keys(): Array<string> {
    let arr = [];
    for (let key in this.keys) {
      if (true === true)
        arr.push(key);
    }
    return arr;
  }

  private get _selectedItem(): string {
    if (this._lockedKey) return this._candidate;
    return this._key;
  }
  private set _selectedItem(value: string) {
    if (this._lockedKey) {
      this._candidate = value;
    } else this._key = value;
  }

  private _candidate: string;

  private _overlay: Element;
  private _popup: Element;
  private _input: HTMLElement;
  private _overflow: HTMLElement;
  private _popupVisible: boolean = false;
  private _active: boolean = false;
  private focused: boolean;

  constructor(private _elementRef: ElementRef, private _renderer: Renderer) { }

  ngAfterViewInit() {
    this._overlay = document.getElementsByClassName('md-overlay-container')[0];
    this._popup = this._elementRef.nativeElement.getElementsByClassName('smart-search-popup')[0];
    this._input = this._elementRef.nativeElement.getElementsByClassName('md-input-element')[0];
    this._overflow = this._elementRef.nativeElement.getElementsByClassName('overflow')[0];
    this._overlay.appendChild(this._popup);
    // this._input.focus();
  }
  blur() {
    this.focused = false;
    if (!this._popupVisible) return;
    setTimeout(() => {
      if (this.focused) return;
      this._active = false;
      setTimeout(() => {
        this._popupVisible = false;
      }, 200);
    }, 200);
  }
  textChange(text: string) {
    // Check if we've lost locked key
    if (this._lockedKey && text.toUpperCase().startsWith(this._lockedKey.toUpperCase() + ':')) {
      // Todo manage input items
      this._items = this.getCandidates(this._lockedKey, this._value);
      this._candidate = undefined;
      for (let candidate of this._items) {
        if (candidate.toUpperCase().indexOf(this._value.toUpperCase()) !== -1) {
          if (!this._candidate) this._candidate = candidate;
          // this._items.push(candidate);
        }
      }
      return;
    }
    this._candidate = undefined;
    this._lockedKey = undefined;
    if (!this._popupVisible) this.openPopup(); else
      this.setPosition();



    this._key = undefined;
    if (!text || text === '') {
      this._items = this._keys;
      return;
    }

    this._items = [];

    for (let key in this.keys) {
      if (key.toUpperCase().startsWith(text.toUpperCase())) {
        if (!this._key) {
          this._key = key;
        }
        this._items.push(key);
      }
    }
  }


  keyPress(code: string, ctrlKey: boolean) {
    switch (code) {
      case 'Space':
        if (ctrlKey) {
          this.togglePopup();
        }
        break;
      case 'PageUp':
        this.pageUp();
        break;
      case 'PageDown':
        this.pageDown();
        break;
      case 'ArrowDown':
      case 'ArrowUp':
        this.manageArrowKeys(code);
        break;
      case 'Escape':
        this.manageEscapeKey();
        break;
      case 'Enter':
      case 'NumpadEnter':
        this.manageEnterKey();
        break;
      case 'Backspace':
        if ((!this.text || this.text === '') && this.dico.keys.length > 0) {
          this.deleteKey(this.dico.keys[this.dico.keys.length - 1]);
          setTimeout(() => this.setPosition());
        }
        break;
      default:
        return;
    }
  }

  manageEnterKey() {
    if (this._lockedKey) {
      if (this._candidate) {
        this.addKey(this._lockedKey, this._candidate);
        // this.text = this._lockedKey + ': ' + this._candidate;
        setTimeout(() => this.setPosition());
        this.closePopup();
        return;
      }
      if (!this._value) return;
      this.addKey(this._lockedKey, this._value);
      // if (!this._popupVisible) this.openPopup(); else this.setPosition();
      if (this._popupVisible) this.setPosition();
      return;
    }

    if (this._key) {
      this.lockKey(this._key);
    }
  }

  manageArrowKeys(code: string) {
    let length = this._items.length;
    if (length === 0) return;

    if (!this._selectedItem) {
      // No element selected, select first or last
      if (code === 'ArrowDown') {
        this._selectedItem = this._items[0];
        return;
      }
      this._selectedItem = this._items[length - 1];
      this._overflow.scrollTop = length * 32;
      return;
    }
    let index = this._items.indexOf(this._selectedItem);
    let st = this._overflow.scrollTop;
    if (code === 'ArrowDown') {
      if (index === length - 1) return;
      this._selectedItem = this._items[index + 1];
      if (index + 1 - st / 32 > 15)
        this._overflow.scrollTop = st + 32;
    } else {
      if (index === 0) return;
      this._selectedItem = this._items[index - 1];
      if (index - 1 - st / 32 < 0)
        this._overflow.scrollTop = st - 32;
    }
  }


  pageUp() {
    let length = this._items.length;
    if (length === 0) return;
    if (!this._selectedItem) {
      this._selectedItem = this._items[length - 1];
      this._overflow.scrollTop = length * 32;
      return;
    }
    let index = this._items.indexOf(this._selectedItem);
    if (index === 0) return;
    let newIndex = index - 16;
    if (newIndex < 0) newIndex = 0;
    this._selectedItem = this._items[newIndex];
    let st = this._overflow.scrollTop;
    if (newIndex - st / 32 < 0) this._overflow.scrollTop = st  + (newIndex - index) * 32;
  }

  pageDown() {
    let length = this._items.length;
    if (length === 0) return;
    if (!this._selectedItem) {
      // No element selected, select first or last
      this._selectedItem = this._items[0];
      return;
    }
    let index = this._items.indexOf(this._selectedItem);
    if (index === length - 1) return;
    let st = this._overflow.scrollTop;
    let newIndex = index + 16;
    if (newIndex >= length) newIndex = length - 1;
    this._selectedItem = this._items[newIndex];
    if (newIndex - st / 32 > 15) this._overflow.scrollTop = st + (newIndex - index) * 32;
  }


  manageEscapeKey() {
    if (!this._lockedKey) {
      this.text = undefined;
      this._key = undefined;
      this._items = this._keys;
    } else {
      if (this.text === this._lockedKey + ': ') {
        this._lockedKey = undefined;
        this.text = undefined;
        this._key = undefined;
        this._items = this._keys;
      } else this.text = this._lockedKey + ': ';
    }
    this.closePopup();
  }

  itemClick(item: string) {
    if (!this._lockedKey) this.lockKey(item); else {
      this.addKey(this._lockedKey, item);
    }

    this._input.focus();
  }

  lockKey(key: string) {
    if (!this._lockedKey) {
      this._lockedKey = key;
      this.text = key + ': ';
      this._key = undefined;
      this._candidate = undefined;
      this._items = this.getCandidates(key, undefined);
      // if (this.keys[key]) this._candidates = this.keys[key](''); else this._candidates = [];
      // this._items = this._candidates;
      this.setPosition();
    }
  }

  getCandidates(key: string, text: string): Array<string> {
    if (!this.keys[key]) return [];
    return this.keys[key](text, this.filters);
  }

  addKey(key: string, value: string) {
    this.dico.add(this._lockedKey, value);
    this.filters[this._lockedKey] = value;
    this._lockedKey = undefined;
    this.text = '';
    this._items = this._keys;
    this.filterChange.emit(this.filters);
    setTimeout(() => this.setPosition());
  }

  deleteKey(key: string) {
    this.dico.remove(key);
    delete this.filters[key];
    this.filterChange.emit(this.filters);
  }

  togglePopup() {
    if (this._popupVisible) this.closePopup(); else this.openPopup();
  }

  openPopup() {
    if (!this._lockedKey) {
      // this._items = [];
      this._items = this._keys;
    } else {
      // ToDo input items
      this._items = this.getCandidates(this._lockedKey, this._value);
    }
    this.setPosition();
    this._popupVisible = true;
    setTimeout(() => {
      this._active = true;
    }, 10);
  }

  closePopup() {
    this._popupVisible = false;
  }

  setPosition() {
    let rec = this._input.getBoundingClientRect();
    this._renderer.setElementStyle(this._popup, 'top', rec.bottom + 10 + 'px');
    if (!this._lockedKey)
      this._renderer.setElementStyle(this._popup, 'left', rec.left + 'px'); else
      this._renderer.setElementStyle(
        this._popup, 'left', rec.left + ((this._lockedKey.length + 2) * 6) + 'px');
  }

  isInElement(element, x, y): boolean {
    let rect = element.getBoundingClientRect();
    return rect.top <= y &&
      y <= rect.top + rect.height &&
      rect.left <= x &&
      x <= rect.left + rect.width;
  }

  ngOnDestroy() {
    this._overlay.removeChild(this._popup);
  }
}
