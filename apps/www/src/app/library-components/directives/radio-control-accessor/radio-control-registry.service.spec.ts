import {RadioControlRegistry} from "./radio-control-registry.service";
import {TestBed} from "@angular/core/testing";
import {ControlValueAccessor} from "@angular/forms";
import {noop} from "rxjs";

class ControlValueAccessSpec implements ControlValueAccessor {

  onChange = noop;
  onTouched = noop;

  registerOnChange = jest.fn();

  registerOnTouched = jest.fn();

  writeValue = jest.fn();

  setDisabledState = jest.fn();
}

const name = 'radio-control';

describe('Radio Control Registry', () => {

  let registry: RadioControlRegistry;
  let control1: ControlValueAccessSpec;
  let control2: ControlValueAccessSpec;
  let control3: ControlValueAccessSpec;

  beforeEach(() => {
    registry = TestBed.get(RadioControlRegistry);
    control1 = new ControlValueAccessSpec();
    control2 = new ControlValueAccessSpec();
    control3 = new ControlValueAccessSpec();
  });

  it('should register "controls"', () => {
    registry.add(name, control1);
    registry.add(name, control2);
    registry.add(name, control3);
    expect(registry['accessors'].length).toBe(3);
  });

  it('should remove "controls"', () => {
    registry.add(name, control1);
    registry.add(name, control2);
    registry.remove(control1);
    expect(registry['accessors'].length).toBe(1);
  });

  it("should set the value of all controls matching `name`", () => {
    const value = 'Hello World';
    registry.add(name, control1);
    registry.add(name, control2);
    registry.add(`${name}-2`, control3);

    registry.setValue(name, value)
    expect(control1.writeValue).toHaveBeenCalledWith(value)
    expect(control2.writeValue).toHaveBeenCalledWith(value)
    expect(control3.writeValue).not.toHaveBeenCalled();
  });

})
