import { AbstractControl, ValidationErrors } from '@angular/forms';

export class TextValidators {
  static minimumWords(words: number) {
    const callBack =
      () =>
      (control: AbstractControl): ValidationErrors | null => {
        if (control.value.length < words * 2.5)
          return {
            minimumWords: true,
          };
        return null;
      };
    return callBack();
  }
}
