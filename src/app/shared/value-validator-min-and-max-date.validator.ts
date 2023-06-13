import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ValuesValidatorsDynamic } from '../shared/meta-data';

export function valueValidatorMinAndMaxDate(
  control: AbstractControl
): ValidationErrors | null {
  let forbidden = false;
  const pattern = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
  if (control.value) {
    if (
      control.value !== ValuesValidatorsDynamic.today &&
      control.value !== ValuesValidatorsDynamic.tomorrow &&
      !control.value.includes(ValuesValidatorsDynamic.newDate)  &&
      !pattern.test(control.value)
    ) {
      forbidden = true;
    }
    return forbidden ? { valuevalidatorminandmaxdate: true } : null;
  }
  return null;
}
