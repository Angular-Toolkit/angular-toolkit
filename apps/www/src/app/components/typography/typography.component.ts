import {Component, HostBinding, Input} from "@angular/core";
import {BooleanInput, coerceBooleanProperty} from "@angular/cdk/coercion";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[app-type]',
  template: `
    <ng-content/>`,
  styleUrls: ['./typography.component.css'],
  standalone: true,
})
export class TypographyComponent {

  @HostBinding('class.type')
  readonly hbClassType = true;

  @HostBinding('class.type--title')
  get hbClassTypeTitle() {
    return this.type === 'title';
  }

  @HostBinding('class.type--heading-1')
  get hbClassTypeHeading1() {
    return this.type === 'heading-1';
  }

  @HostBinding('class.type--heading-2')
  get hbClassTypeHeading2() {
    return this.type === 'heading-2';
  }

  @HostBinding('class.type--lead')
  get hbClassTypeLead() {
    return this.type === 'lead';
  }

  @HostBinding('class.type--color-invert')
  get hbClassTypeColourInvert() {
    return this.colour === 'invert';
  }

  @HostBinding('class.type--color-white')
  get hbClassTypeColourWhite() {
    return this.colour === 'white';
  }

  @HostBinding('class.type--margin-bottom')
  get hbClassTypeMarginBottom() {
    return coerceBooleanProperty(this.marginBottom);
  }

  @Input() colour?: 'invert' | 'white';
  @Input() type?: 'title' | 'heading-1' | 'heading-2' | 'lead';
  @Input() marginBottom: BooleanInput = false;
}
