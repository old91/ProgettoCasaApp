import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorsService {
  constructor() { }

  passwordPattern(): ValidatorFn {
    let regex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const valid = regex.test(control.value);
      return valid ? null : {wrongPassword: control.value};
    };
  }
  emailPattern(): ValidatorFn {
    let regex =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const valid = regex.test(control.value);
      return valid ? null : {wrongEmail: control.value};
    };
  }
  passwordMatch(form : FormGroup): any {
    const password: string = form.controls.newPassword.value; 
    const confirmPassword: string = form.controls.confirmPassword.value; 
    if (password !== confirmPassword) {
      return false;
    }else{
      return true;
    }
  }
}


