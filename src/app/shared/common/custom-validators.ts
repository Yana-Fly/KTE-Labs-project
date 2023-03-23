import {AbstractControl, ValidationErrors} from "@angular/forms";

export class CustomValidators {
  static titleItemValidator(control: AbstractControl): ValidationErrors | null {
    const result = /^[а-яёА-ЯЁ\s]*$/.test(control.value);
    return result ? null : {titleValid: {value: control.value}};
  }
}
