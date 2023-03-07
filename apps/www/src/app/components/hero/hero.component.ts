import {Component, HostBinding} from "@angular/core";
import {ContainerComponent} from "../container";

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  standalone: true,
  imports: [
    ContainerComponent
  ]
})
export class HeroComponent {

  @HostBinding('class.hero')
  readonly hbClassHero = true;

}
