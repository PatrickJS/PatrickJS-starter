import {
    Component,
    Input,
    ElementRef,
    ViewChild,
    Renderer,
    forwardRef,
    OnInit
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const INLINE_EDIT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InlineEditComponent),
    multi: true
};

@Component({
    selector: 'inline-edit',
    templateUrl: './inline-edit.html',
    providers: [INLINE_EDIT_CONTROL_VALUE_ACCESSOR],
    styles: [require('./inline-edit.scss')]
})
export class InlineEditComponent implements ControlValueAccessor {

    @ViewChild('inlineEditControl')
    public inlineEditControl: ElementRef; // input DOM element
    @Input()
    public label: string = '';  // Label value for input element
    @Input()
    public type: string = 'text'; // The type of input element
    @Input()
    public required: boolean = false; // Is input requried?
    @Input()
    public disabled: boolean = false; // Is input disabled?
    public onChange: any = Function.prototype; // Trascend the onChange event
    public onTouched: any = Function.prototype; // Trascend the onTouch event
    public editing: boolean = false; // Is Component in edit mode?

    private _value: string = ''; // Private variable for input value
    private preValue: string = ''; // The value before clicking to edit

    constructor(element: ElementRef, private _renderer: Renderer) {
    }

    // Control Value Accessors for ngModel
    get value(): any {
        return this._value;
    }

    set value(v: any) {
        if (v !== this._value) {
            this._value = v;
            this.onChange(v);
        }
    }

    // Required for ControlValueAccessor interface
    public writeValue(value: any) {
        this._value = value;
    }

    // Required forControlValueAccessor interface
    public registerOnChange(fn: (_: any) => {}): void {
        this.onChange = fn;
    }

    // Required forControlValueAccessor interface
    public registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }

    // Do stuff when the input element loses focus
    public onBlur($event: Event) {
        this.editing = false;
    }

    // Start the editting process for the input element
    public edit(value) {
        if (this.disabled) {
            return;
        }

        this.preValue = value;
        this.editing = true;
        // Focus on the input element just as the editing begins
        setTimeout(() => {
            this.inlineEditControl.nativeElement.focus();
        });
    }

}
