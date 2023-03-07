import {Component, HostBinding, Input} from "@angular/core";
import {BooleanInput, coerceBooleanProperty} from "@angular/cdk/coercion";

@Component({
  selector: 'app-container',
  template: `
    <ng-content/>`,
  styleUrls: ['./container.component.css'],
  standalone: true,
})
export class ContainerComponent {

  @HostBinding('class.container')
  readonly hbClassContainer = true;

  @HostBinding('class.container--wide')
  get hbClassContainerWide() {
    return coerceBooleanProperty(this.wide);
  }

  @Input() wide: BooleanInput = false

}
