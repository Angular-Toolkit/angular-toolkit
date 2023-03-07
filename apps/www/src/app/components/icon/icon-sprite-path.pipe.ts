import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'iconSpritePath',
  pure: true,
  standalone: true,
})
export class IconSpritePathPipe implements PipeTransform {

  transform(value: string): string {
    return `/assets/core-ui/free.svg#cil-${value}`;
  }

}
