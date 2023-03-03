import {Component, HostBinding, OnDestroy, OnInit} from "@angular/core";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {Subscription} from "rxjs";
import {SegmentedControlButtonComponent, SegmentedControlComponent} from "../segmented-control";
import {RadioValueAccessorDirective} from "../../library-components/directives";
import {ColorModeService, ColourMode} from "../../library-components/services";
import {ContainerComponent} from "../container";
import {IconComponent} from "../icon";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[app-masthead]',
  styleUrls: ['./masthead.component.css'],
  templateUrl: './masthead.component.html',
  imports: [
    ContainerComponent,
    IconComponent,
    SegmentedControlComponent,
    SegmentedControlButtonComponent,
    ReactiveFormsModule,
    RadioValueAccessorDirective,
  ],
  standalone: true
})
export class MastheadComponent implements OnInit, OnDestroy {
  protected ColorMode = ColourMode;
  protected mode = new FormControl(ColourMode.AUTO);
  protected expanded = false;

  private mode$!: Subscription;
  private storageMode$!: Subscription;

  @HostBinding('class.masthead') readonly hbClassMasthead = true;

  @HostBinding('class.masthead--expanded')
  get hbClassMastheadExpanded() {
    return this.expanded;
  }

  constructor(protected colorModeService: ColorModeService) {
  }

  ngOnInit() {
    this.mode$ = this.mode.valueChanges.subscribe(this.onValueChange);
    this.storageMode$ = this.colorModeService.asObservable.subscribe(this.onStorageChange);
  }

  ngOnDestroy() {
    this.mode$.unsubscribe();
    this.storageMode$.unsubscribe();
  }

  onStorageChange = (value: ColourMode) => {
    this.mode.setValue(value);
  }

  onValueChange = (value: ColourMode | null) =>
    value
      ? this.colorModeService.set(value)
      : this.colorModeService.set(ColourMode.AUTO)

  toggleExpanded() {
    this.expanded = !this.expanded;
  }

}
