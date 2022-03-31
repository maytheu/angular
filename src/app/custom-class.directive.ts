import { Directive } from '@angular/core';

@Directive({
  selector: '[appCustomClass]'
})
export class CustomClassDirective {

  constructor() { 
    console.log('custom directive');
    
  }

}
