import { AbstractControl } from '@angular/forms';

export class MathValidators {
  static addition(target: string, source1: string, source2: string) {
    return (form: AbstractControl) => {
      const sum = form.value[target],
        fNum = form.value[source1],
        sNum = form.value[source2];
        
      if (fNum + sNum === +sum) return null;
      return { addition: true };
    };
  }
}
