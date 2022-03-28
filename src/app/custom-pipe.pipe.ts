import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPipe',
})
export class CustomPipePipe implements PipeTransform {
  transform(value: number, unit: string): any {
    if (!value) return '';
    // unit conversion cases
    switch (unit) {
      case 'km':
        return value * 1.609;
      case 'm':
        return value * 1.609 * 1000;
      case 'cm':
        return value * 1.609 * 1000 * 1000;
      default:
        throw new Error('Unit not supported');
    }
  }
}
