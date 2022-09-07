import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

//this directives negate the ngif
@Directive({
  selector: "[oppIf]",
})
export class OppIfDirective {
  visible = false; //to prevent calling multiple times
  @Input() set oppIf(condition: boolean) {
    if (!condition && !this.visible) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.visible = true;
    } else if (condition && this.visible) {
      this.viewContainer.clear();
      this.visible = false;
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}
}
