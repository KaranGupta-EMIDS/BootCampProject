import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { validateEmail, validateMobileNo } from '../../core/utilities/helper';
@Directive({
  selector: '[compositeField]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CompositeFieldValidator),
      multi: true,
    },
  ],
})
export class CompositeFieldValidator implements Validator {
  constructor(@Attribute('compositeField') public compositeField: string) {}

  private get isActive() {
    if (!this.compositeField) return false;
    return this.compositeField === 'true' ? true : false;
  }

  validate(c: AbstractControl): { [key: string]: any } {
    if (this.isActive) {
      let isEmailEntered: boolean = c.value && c.value.indexOf('@') !== -1;
      let isValid = isEmailEntered
        ? validateEmail(c.value)
        : validateMobileNo(c.value);

      if (!isValid) {
        return { [isEmailEntered ? 'email' : 'mobile']: !isValid };
      }
    }

    return null;
  }
}
