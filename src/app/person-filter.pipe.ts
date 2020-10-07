import { Pipe, PipeTransform } from '@angular/core';
import { Person } from './services/person';

@Pipe({
  name: 'personFilter',
})
export class PersonFilterPipe implements PipeTransform {
  transform(value: Person[], filterText?: string): Person[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (p: Person) =>
           p.firstName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
