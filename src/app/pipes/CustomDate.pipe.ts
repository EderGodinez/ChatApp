import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appCustomDate',
  standalone: true,
})
export class CustomDatePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value;
  }

}
