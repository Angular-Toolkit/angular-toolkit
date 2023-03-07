import {AfterViewInit, Component, ContentChildren, HostBinding, HostListener, QueryList} from "@angular/core";
import {SegmentedControlButtonComponent} from "./segmented-control-button.component";
import {FocusKeyManager} from "@angular/cdk/a11y";

@Component({
  selector: 'app-segmented-control',
  template: '<ng-content/>',
  styleUrls: ['./segmented-control.component.css'],
  standalone: true,
})
export class SegmentedControlComponent implements AfterViewInit {

  focusKeyManager!: FocusKeyManager<SegmentedControlButtonComponent>;

  @ContentChildren(SegmentedControlButtonComponent)
  private ccSegmentControlButtonComponent!: QueryList<SegmentedControlButtonComponent>

  @HostBinding('attr.role')
  readonly hbAttrRole = 'radiogroup';

  @HostBinding('class.segmented-control')
  readonly hbClassSegmentedControl = true;

  @HostListener('keydown', ['$event'])
  onKeydown($event: KeyboardEvent) {
    this.focusKeyManager.onKeydown($event);
  }

  ngAfterViewInit() {
    this.focusKeyManager = new FocusKeyManager<SegmentedControlButtonComponent>(this.ccSegmentControlButtonComponent);
    this.focusKeyManager.withHorizontalOrientation('ltr')

    const checked = this.ccSegmentControlButtonComponent
      .toArray()
      .findIndex(item => item.hbClassSegmentedControlSegmentActive);

    this.focusKeyManager.updateActiveItem(checked);
  }

}
