
import { Directive } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

export const passwordMatcher: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if( (password.value && confirmPassword.value && password.value !== confirmPassword.value)){
    return { 'mustMatch': true }
  }
  return  null;
};

@Directive({
  selector: '[appPasswordMatcher]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordMatcherDirective, multi: true }]
})
export class PasswordMatcherDirective {

  constructor() { }
  validate(control: AbstractControl): ValidationErrors {
    return passwordMatcher(control);
  }
}
