import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
/**
 * Formatting DateTime for display.
 */
@Pipe({
  name: 'dateTime',
})
export class DateTimePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    const today = moment().startOf('day');
    const yesterday = moment().subtract(1, 'days').startOf('day');

    let dateTime = '';

    // if is Today
    if (moment(value).isSame(today, 'day')) {
      dateTime = moment(value).format('hh:mm');
    }
    // if is Yesterday
    if (moment(value).isSame(yesterday, 'day')) {
      dateTime = 'yesterday';
    }
    // if is before yesterday
    if (moment(value).isBefore(yesterday)) {
      dateTime = moment(value).format('MMM DD');
    }
    return dateTime;
  }
}
