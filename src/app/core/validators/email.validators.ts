import { AbstractControl, ValidationErrors } from '@angular/forms';

export class EmailValidators {
  static shouldBeUnique(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'a@1') return resolve({ shouldBeUnique: true });
        else return resolve(null);
      }, 1000);
    });
  }
}
