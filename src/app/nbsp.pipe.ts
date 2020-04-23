import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nbsp'
})
export class NbspPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/-/g, '-\u200D');
  }

}
