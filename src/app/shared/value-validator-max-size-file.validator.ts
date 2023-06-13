import { AbstractControl, ValidationErrors } from '@angular/forms';

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
