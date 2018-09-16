import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterText'
})
export class FilterTextPipe implements PipeTransform {

  transform(value: any, args?: any, field?: string, field1?: string): any {
    if (!value || value.length === 0) {
      return value;
    }
    return value.filter(item => {
   
      if (field  && field1) {
        return item[field][field1].toLowerCase().includes(args.toLowerCase());
      }

      if (field) {
        return item[field].toLowerCase().includes(args.toLowerCase());
      }

      return value;
    });
  }

}