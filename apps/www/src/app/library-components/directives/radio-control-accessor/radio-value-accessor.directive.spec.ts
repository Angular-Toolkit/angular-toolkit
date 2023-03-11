import {Component, HostBinding, HostListener, Input} from "@angular/core";
import {RadioValueAccessorDirective} from "./radio-value-accessor.directive";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {fireEvent, render, RenderResult} from "@testing-library/angular";

const selectors = {
  one: 'control-one',
  two: 'control-two',
  three: 'control-three',
}

@Component({
  selector: 'app-rva',
  template: '',
  standalone: true,
  hostDirectives: [{
    directive: RadioValueAccessorDirective,
    // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
    inputs: ['name', 'value'],
  }],
})
export class RadioValueAccessorSpecComponent {

  @Input() name!: string;
  @Input() value!: string;

  @HostBinding('attr.data-testid')
  get hostAttrTestId() {
    return `${this.name}-${this.value}`;
  }

  @HostBinding('attr.data-selected')
  get hostAttrSelected() {
    return this.rva.selected;
  }


  @HostBinding('attr.data-disabled')
  get hostAttrDisabled() {
    return this.rva.disabled;
  }

  @HostBinding('attr.data-value')
  get hostAttrValue() {
    return this.value;
  }

  @HostListener('click')
  onClick() {
    this.rva.select();
  }

  constructor(
    private rva: RadioValueAccessorDirective,
  ) {
  }

}


describe('Radio Value Accessor Directive', () => {

  it('should throw an error if name is not provided', async () => {
    const instance = await render(`<app-rva value="one"/>`, {
      imports: [RadioValueAccessorSpecComponent],
      detectChangesOnRender: false
    });
    expect(instance.detectChanges).toThrow()
  });

  it('should throw an error if value is not provided', async () => {
    const instance = await render(`<app-rva name="one"/>`, {
      imports: [RadioValueAccessorSpecComponent],
      detectChangesOnRender: false
    });
    expect(instance.detectChanges).toThrow()
  });

  describe('Control Value Accessor', () => {

    let result: RenderResult<{ control: FormControl }>;
    let control1: HTMLElement;
    let control2: HTMLElement;

    beforeEach(async () => {
      result = await render(`
        <app-rva name="control" value="one" [formControl]="control"/>
        <app-rva name="control" value="two" [formControl]="control"/>
        <app-rva name="control" value="three" [formControl]="control"/>
      `,
        {
          imports: [ReactiveFormsModule, RadioValueAccessorSpecComponent],
          componentProperties: {control: new FormControl<string>('')}
        });

      control1 = result.getByTestId(selectors.one);
      control2 = result.getByTestId(selectors.two);
    });

    it('should not select a control without a matching value', () => {
      expect(control1).toHaveAttribute('data-selected', 'false');
      expect(control2).toHaveAttribute('data-selected', 'false');
    });

    it('should only select the interacted control', () => {
      fireEvent.click(control1);
      expect(control1).toHaveAttribute('data-selected', 'true');
      expect(control2).toHaveAttribute('data-selected', 'false');
    });

    it('should only allow a single control to be selected', () => {
      fireEvent.click(control1);
      fireEvent.click(control2);
      expect(control1).toHaveAttribute('data-selected', 'false');
      expect(control2).toHaveAttribute('data-selected', 'true');
    });

    it('should set the NG_CONTROL value to the selected value', () => {
      fireEvent.click(control2);
      const value = control2.getAttribute('data-value');
      expect(result.fixture.componentInstance.control.value).toBe(value);
    });

    it('should disable all controls that share the NG_CONTROL', () => {
      result.fixture.componentInstance.control.disable();
      result.detectChanges();
      expect(control1).toHaveAttribute('data-disabled', 'true');
      expect(control2).toHaveAttribute('data-disabled', 'true');
    });

  });

});
