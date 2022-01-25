import { AbstractControl, ValidationErrors } from '@angular/forms';

export class PasswordValidators {
  static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).indexOf(' ') >= 0)
      return {
        cannotContainSpace: true,
      };
    return null;
  }
  static mustBeValid(control: AbstractControl): ValidationErrors | null {
    let password = control.value as string;
    if (password.length < 6 && password.length > 0) return { mustBeValid: true };
    return null;
  }
}
