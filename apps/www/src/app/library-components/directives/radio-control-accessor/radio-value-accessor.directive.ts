import {Directive, Input, OnDestroy, OnInit} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {noop} from "rxjs";
import {RadioControlRegistry} from "./index";


@Directive({
  selector: '[appRadioValueAccessor]',
  standalone: true,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: RadioValueAccessorDirective,
    multi: true
  }]
})
export class RadioValueAccessorDirective implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() name!: string;
  @Input() value: unknown;

  selected = false;
  disabled = false

  constructor(
    private radioControlRegistry: RadioControlRegistry,
  ) {
  }

  onChange: (value: unknown) => void = noop;
  onTouched: () => void = noop;

  ngOnInit() {
    if (!this.name) {
      throw new Error('RadioValueAccessorDirective // Name is a required Input')
    }

    if (!this.value) {
      throw new Error('RadioValueAccessorDirective // Value is a required Input')
    }

    this.radioControlRegistry.add(this.name, this);
  }

  ngOnDestroy() {
    this.radioControlRegistry.remove(this);
  }

  registerOnTouched(fn: never) {
    this.onTouched = fn;
  }

  registerOnChange(fn: never) {
    this.onChange = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  writeValue(value: unknown) {
    this.selected = value === this.value;
  }

  select() {
    this.radioControlRegistry.setValue(this.name, this.value);
    this.writeValue(this.value);
    this.onChange(this.value);
    this.onTouched();
  }

}

