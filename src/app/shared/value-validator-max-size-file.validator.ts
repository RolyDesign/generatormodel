import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ValuesValidatorsDynamic } from '../generator-model/meta-data';

export function valueValidatorMaxSizeFile(
  control: AbstractControl
): ValidationErrors | null {
  let forbidden = false;
  if (control.value) {
    if (
    isNaN(control.value)
    ) {
      forbidden = true;
    }
    return forbidden ? { valuevalidatormaxsizefile: true } : null;
  }
  return null;
}
