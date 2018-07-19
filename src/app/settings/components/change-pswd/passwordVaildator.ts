/**
 * Created by GRE511 on 2018-07-19.
 */
import { AbstractControl } from '@angular/forms';

export class PasswordFormValidator {
  static checkPassword(AC: AbstractControl):any {
    const password = AC.get('usr_pw').value;
    const confirmPassword = AC.get('usr_pw_cf').value;
    if(password != confirmPassword) {
      AC.get('usr_pw_cf').setErrors({checkPassword: true})
    } else {
      return null;
    }
  }

  static diffrentOldAndNewPassword(AC: AbstractControl):any {
    const oldPassword = AC.get('usr_pw_old').value;
    const newPassword = AC.get('usr_pw').value;
    if(oldPassword == newPassword) {
      AC.get('usr_pw').setErrors({samePassword: true})
    } else {
      return null;
    }
  }
}