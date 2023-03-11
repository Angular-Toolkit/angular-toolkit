import {Directive, Input, TemplateRef, ViewContainerRef} from "@angular/core";

class DuplicateContext {
  constructor(public index: number, public count: number) {}

  get first() {
    return this.index === 0;
  }

  get last() {
    return this.index === this.count - 1;
  }

  get even() {
    return this.index % 2 === 0;
  }

  get odd() {
    return !this.even;
  }
}

@Directive({
  selector: '[ngtDuplicate]',
  standalone: true
})
export class DuplicateDirective {
  constructor(
    private templateRef: TemplateRef<DuplicateContext>,
    private viewContainerRef: ViewContainerRef
  ) {
  }

  @Input('ngtDuplicate') set count(value: number) {
    this.viewContainerRef.clear();
    for (let index = 0; index < value; index++) {
      const context = new DuplicateContext(index, value);
      this.viewContainerRef.createEmbeddedView(this.templateRef, context);
    }
  }

  static ngTemplateContextGuard(
    directive: DuplicateDirective,
    context: DuplicateContext
  ): context is DuplicateContext {
    return true
  }
}
