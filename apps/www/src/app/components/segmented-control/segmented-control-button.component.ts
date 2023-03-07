import {Component, ElementRef, HostBinding, HostListener, Input} from "@angular/core";
import {RadioValueAccessorDirective} from "../../library-components/directives/radio-control-accessor";
import {FocusableOption, FocusOrigin} from "@angular/cdk/a11y";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[app-segmented-control-button]',
  styleUrls: ['./segmented-control-button.component.css'],
  hostDirectives: [{
    directive: RadioValueAccessorDirective,
    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
    inputs: ['value', 'name'],
  }],
  template: '<ng-content/>',
  standalone: true,
})
export class SegmentedControlButtonComponent implements FocusableOption {

  @Input() name!: string;
  @Input() value!: string;

  @HostBinding('attr.role')
  readonly hbAttrRole = 'radio';

  @HostBinding('attr.tabindex')
  get hbAttrTabindex(): null | -1 {
    return this.control.checked
      ? null
      : -1;
  }

  @HostBinding('attr.aria-checked')
  get hbAttrAriaChecked(): boolean {
    return this.control.checked
      ? true
      : false;
  }

  @HostBinding('class.segmented-control__segment')
  readonly hbClassSegmentedControlSegment = true;

  @HostBinding('class.segmented-control__segment--active')
  get hbClassSegmentedControlSegmentActive() {
    return this.control.checked;
  }

  @HostListener('click')
  onClick() {
    this.control.select();
  }

  constructor(
    private elRef: ElementRef<HTMLButtonElement>,
    protected control: RadioValueAccessorDirective,
  ) {
  }

  focus(origin?: FocusOrigin) {
    this.elRef.nativeElement.focus();
  }

}
