import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'visual'
})
export class VisualPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
