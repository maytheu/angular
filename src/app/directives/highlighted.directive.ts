import { Directive, HostBinding, Input } from "@angular/core";

@Directive({
  selector: "[highlighted]",
})
export class HighlightedDirective {
  @Input("highlighted") isHighlighted = false;
  constructor() {
    console.log("directive createed");
  }
  // @HostBinding("className") get cssClasses() {
  //   return "highlighted";
  // }
  or;
  @HostBinding("class.highlighted") get cssClasses() {
    return this.isHighlighted;
  }
}
