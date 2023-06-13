import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ValuesValidatorsDynamic } from '../shared/meta-data';

export function valueValidatorTypeFile(
  control: AbstractControl
): ValidationErrors | null {
  let forbidden = false;
  if (control.value) {
    if (
      control.value !== ValuesValidatorsDynamic.mimeImg &&
      control.value !== ValuesValidatorsDynamic.mimeText
    ) {
      forbidden = true;
    }
    return forbidden ? { valuevalidatortypefile: true } : null;
  }
  return null;
}
