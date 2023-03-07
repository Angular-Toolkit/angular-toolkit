import {Injectable} from "@angular/core";
import type {ControlValueAccessor} from "@angular/forms";

@Injectable({providedIn: 'root'})
export class RadioControlRegistry {
  private accessors: Array<[string, ControlValueAccessor]> = [];

  add(name: string, accessor: ControlValueAccessor) {
    this.accessors.push([name, accessor]);
  }

  remove(accessor: ControlValueAccessor) {
    const index = this.accessors.findIndex(([, _accessor]) => _accessor === accessor);
    if (index > -1) {
      this.accessors.splice(index, 1);
    }
  }

  setValue(name: string, value: unknown) {
    this.accessors
      .filter(([_name]) => _name === name)
      .forEach(([, _accessor]) => _accessor.writeValue(value));
  }
}
