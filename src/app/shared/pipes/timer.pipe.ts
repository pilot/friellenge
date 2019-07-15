import {Pipe, PipeTransform} from '@angular/core';

/**
 * Append 0 for display timer
 */

@Pipe({
  name: 'timer',
})
export class TimerPipe implements PipeTransform {
  transform(value: number, ...args) {
    return (value >= 10) ? value : `0${value}`;
  }
}
