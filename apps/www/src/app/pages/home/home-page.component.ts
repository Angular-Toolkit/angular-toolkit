import {Component} from "@angular/core";
import {TypographyComponent} from "../../components/typography";
import {HeroComponent} from "../../components/hero";
import {ContainerComponent} from "../../components/container";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  standalone: true,
  imports: [
    TypographyComponent,
    HeroComponent,
    ContainerComponent
  ]
})
export class HomePageComponent {

}
