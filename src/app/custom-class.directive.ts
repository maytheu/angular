import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appCustomClass]',
})
export class CustomClassDirective {
  constructor(private element: ElementRef) {}

  // @Input('appCustomClass') set backgroundColor(color: string) {
  //   this.element.nativeElement.style.backgroundColor = color;
  // }

  // set classname
  @Input('appCustomClass') set className(classObj: any) {
    for (let key in classObj) {
      if (classObj[key]) {
        this.element.nativeElement.classList.add(key);
      } else {
        this.element.nativeElement.classList.remove(key);
      }
    }
  }
}
