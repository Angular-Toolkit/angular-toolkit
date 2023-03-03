import {Component, HostBinding, Input} from "@angular/core";
import {IconSpritePathPipe} from "./icon-sprite-path.pipe";

export type IconName =
  | 'sun'
  | 'sync'
  | 'moon'
  | 'menu'
  | 'x'

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css'],
  standalone: true,
  imports: [
    IconSpritePathPipe
  ]
})
export class IconComponent {

  @HostBinding('class.icon')
  readonly hbClassIcon = true;

  @Input() name: IconName = 'x';

}
