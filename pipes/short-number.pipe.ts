import { Pipe, PipeTransform } from '@angular/core';

const shortNumbers = [
  { key: 'Q', value: Math.pow(10, 15) },
  { key: 'T', value: Math.pow(10, 12) },
  { key: 'B', value: Math.pow(10, 9) },
  { key: 'M', value: Math.pow(10, 6) },
  { key: 'K', value: 1000 },
];

@Pipe({
  name: 'shortNumber',
})
export class ShortNumberPipe implements PipeTransform {
  private rounder = 10;
  transform(value: number, args?: any): string {
    if (isNaN(value)) {
      return null;
    }
    if (value === null) {
      return null;
    }
    if (value === 0) {
      return '0';
    }
    const isNegative = value < 0;
    let valueAbs = Math.abs(value);
    let key = '';

    shortNumbers.forEach((shortNumber) => {
      const valueDivided = valueAbs / shortNumber.value;
      const valueReduced =
        Math.round(valueDivided * this.rounder) / this.rounder;
      if (valueReduced >= 1) {
        valueAbs = valueReduced;
        key = shortNumber.key;
        return;
      }
    });

    return (isNegative ? '-' : '') + valueAbs + key;
  }
}
