/*

Warning: hacks


Don't look at this file since we won't need this after alpha.30 is released




*/









import {NgControlName} from 'angular2/forms';
import {NgControlGroup} from 'angular2/forms';

import {NgFormControl} from 'angular2/forms';
import {NgModel} from 'angular2/forms';
import {NgFormModel} from 'angular2/forms';
import {NgForm} from 'angular2/forms';

import {NgSelectOption} from 'angular2/forms';
// import {SelectControlValueAccessor, NgSelectOption} from 'angular2/forms';
// import {DefaultValueAccessor} from 'angular2/forms';
// import {CheckboxControlValueAccessor} from 'angular2/forms';

import {NgRequiredValidator} from 'angular2/forms';


import {Directive, Query} from 'angular2/annotations';
import {QueryList, ElementRef} from 'angular2/core';
import {bind} from 'angular2/di';
import {NgControl} from 'angular2/forms';
import {Renderer} from 'angular2/render';
import {DomRenderer} from 'angular2/src/render/dom/dom_renderer';
import {isBlank, isPresent} from 'angular2/src/facade/lang';




function setProperty(renderer, elementRef, propName, propValue) {
  renderer.setElementProperty(elementRef, propName, propValue);
}

@Directive({
  selector:
      'input:not([type=checkbox])[ng-control],textarea[ng-control],input:not([type=checkbox])[ng-form-control],textarea[ng-form-control],input:not([type=checkbox])[ng-model],textarea[ng-model]',
  host: {
    '(change)': 'onChange($event.target.value)',
    '(input)': 'onChange($event.target.value)',
    '(blur)': 'onTouched()',
    '[value]': 'value',
    '[class.ng-untouched]': 'ngClassUntouched',
    '[class.ng-touched]': 'ngClassTouched',
    '[class.ng-pristine]': 'ngClassPristine',
    '[class.ng-dirty]': 'ngClassDirty',
    '[class.ng-valid]': 'ngClassValid',
    '[class.ng-invalid]': 'ngClassInvalid'
  }
})
export class DefaultValueAccessor {
  value: string = null;

  onChange = (_) => {};
  onTouched = () => {};

  constructor(
    public cd: NgControl,
    // public renderer: Renderer,
    public elementRef: ElementRef
  ) {

    cd.valueAccessor = this;
  }

  writeValue(value) {
    // both this.value and setProperty are required at the moment
    // remove when a proper imperative API is provided
    this.value = isBlank(value) ? '' : value;
    this.elementRef.nativeElement.value = this.value;
  }

  get ngClassUntouched(): boolean {
    return isPresent(this.cd.control) ? this.cd.control.untouched : false;
  }
  get ngClassTouched(): boolean {
    return isPresent(this.cd.control) ? this.cd.control.touched : false;
  }
  get ngClassPristine(): boolean {
    return isPresent(this.cd.control) ? this.cd.control.pristine : false;
  }
  get ngClassDirty(): boolean { return isPresent(this.cd.control) ? this.cd.control.dirty : false; }
  get ngClassValid(): boolean { return isPresent(this.cd.control) ? this.cd.control.valid : false; }
  get ngClassInvalid(): boolean {
    return isPresent(this.cd.control) ? !this.cd.control.valid : false;
  }

  registerOnChange(fn): void { this.onChange = fn; }

  registerOnTouched(fn): void { this.onTouched = fn; }
}

@Directive({
  selector:
      'input[type=checkbox][ng-control],input[type=checkbox][ng-form-control],input[type=checkbox][ng-model]',
  host: {
    '(change)': 'onChange($event.target.checked)',
    '(blur)': 'onTouched()',
    '[checked]': 'checked',
    '[class.ng-untouched]': 'ngClassUntouched',
    '[class.ng-touched]': 'ngClassTouched',
    '[class.ng-pristine]': 'ngClassPristine',
    '[class.ng-dirty]': 'ngClassDirty',
    '[class.ng-valid]': 'ngClassValid',
    '[class.ng-invalid]': 'ngClassInvalid'
  }
})
export class CheckboxControlValueAccessor {
  checked: boolean;
  onChange = (_) => {};
  onTouched = () => {};

  constructor(
    private cd: NgControl,
    // public renderer: Renderer,
    private elementRef: ElementRef
  ) {

    cd.valueAccessor = this;
  }

  writeValue(value) {
    // both this.checked and setProperty are required at the moment
    // remove when a proper imperative API is provided
    this.checked = value;
    this.elementRef.nativeElement.checked = this.checked;
    // setProperty(this.renderer, this.elementRef, "checked", value);
  }

  get ngClassUntouched(): boolean {
    return isPresent(this.cd.control) ? this.cd.control.untouched : false;
  }
  get ngClassTouched(): boolean {
    return isPresent(this.cd.control) ? this.cd.control.touched : false;
  }
  get ngClassPristine(): boolean {
    return isPresent(this.cd.control) ? this.cd.control.pristine : false;
  }
  get ngClassDirty(): boolean { return isPresent(this.cd.control) ? this.cd.control.dirty : false; }
  get ngClassValid(): boolean { return isPresent(this.cd.control) ? this.cd.control.valid : false; }
  get ngClassInvalid(): boolean {
    return isPresent(this.cd.control) ? !this.cd.control.valid : false;
  }

  registerOnChange(fn): void { this.onChange = fn; }
  registerOnTouched(fn): void { this.onTouched = fn; }
}

@Directive({
  selector: 'select[ng-control],select[ng-form-control],select[ng-model]',
  host: {
    '(change)': 'onChange($event.target.value)',
    '(input)': 'onChange($event.target.value)',
    '(blur)': 'onTouched()',
    '[value]': 'value',
    '[class.ng-untouched]': 'ngClassUntouched',
    '[class.ng-touched]': 'ngClassTouched',
    '[class.ng-pristine]': 'ngClassPristine',
    '[class.ng-dirty]': 'ngClassDirty',
    '[class.ng-valid]': 'ngClassValid',
    '[class.ng-invalid]': 'ngClassInvalid'
  }
})
export class SelectControlValueAccessor {
  value = '';
  onChange = (_) => {};
  onTouched = () => {};

  constructor(
    private cd: NgControl,
    // public renderer: Renderer,
    private elementRef: ElementRef,
    @Query(NgSelectOption, {descendants: true}) query: QueryList<NgSelectOption>
  ) {

    cd.valueAccessor = this;

    this._updateValueWhenListOfOptionsChanges(query);
  }

  writeValue(value) {
    // both this.value and setProperty are required at the moment
    // remove when a proper imperative API is provided
    this.value = value;
    this.elementRef.nativeElement.value = this.value;
    // setProperty(this.renderer, this.elementRef, "value", value);
  }

  get ngClassUntouched(): boolean {
    return isPresent(this.cd.control) ? this.cd.control.untouched : false;
  }
  get ngClassTouched(): boolean {
    return isPresent(this.cd.control) ? this.cd.control.touched : false;
  }
  get ngClassPristine(): boolean {
    return isPresent(this.cd.control) ? this.cd.control.pristine : false;
  }
  get ngClassDirty(): boolean { return isPresent(this.cd.control) ? this.cd.control.dirty : false; }
  get ngClassValid(): boolean { return isPresent(this.cd.control) ? this.cd.control.valid : false; }
  get ngClassInvalid(): boolean {
    return isPresent(this.cd.control) ? !this.cd.control.valid : false;
  }

  registerOnChange(fn): void { this.onChange = fn; }
  registerOnTouched(fn): void { this.onTouched = fn; }

  private _updateValueWhenListOfOptionsChanges(query: QueryList<NgSelectOption>) {
    query.onChange(() => this.writeValue(this.value));
  }
}

import * as forms from 'angular2/forms';

export let formDirectives: Array<any> = [
    DefaultValueAccessor,
    CheckboxControlValueAccessor,
    SelectControlValueAccessor
  ]
  .concat(forms.formDirectives.filter(
    dir =>  dir.name !== 'DefaultValueAccessor' &&
    dir.name !== 'CheckboxControlValueAccessor' &&
    dir.name !== 'SelectControlValueAccessor'
  )
);
/*[

  NgControlName,
  NgControlGroup,

  NgFormControl,
  NgModel,
  NgFormModel,
  NgForm,

  NgSelectOption,
  SelectControlValueAccessor,

  // our fixed version
  // DefaultValueAccessor,

  CheckboxControlValueAccessor,

  NgRequiredValidator
];*/
