import {Pipe, PipeTransform} from '@angular/core';

/**
 * Truncate a text
 */

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  public transform(value: string, args: number): string {
    let words: any = [];
    if (value) {
       words = value.split(' ');
    }
    let i = 0;
    let text = '';

    if (words.length === 1) {
      text = words[0];
    }

    if (words.length > 1 && words.length >= args) {
      while (i < args) {
        text += `${words[i]} `;
        i++;
      }
    }

    if (words.length > 1 && words.length < args) {
      while (i < words.length) {
        text += `${words[i]} `;
        i++;
      }
    }

    return (words.length > 16 && args > 3) ? `${text.trim()}...` : text.trim();
  }
}
