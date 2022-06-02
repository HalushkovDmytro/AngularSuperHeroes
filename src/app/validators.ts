import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Regexp } from "./regexp";
import { UsersService } from "./users.service";

export class UserValidators {
  private static _users: UsersService;
  
  static validEmail(control: AbstractControl): ValidationErrors | null {
    return Regexp.matchingEmail(control.value) ? null : {customEmail: true}
  };

  static validPassword(control: AbstractControl): ValidationErrors | null {
    return Regexp.matchingPassword(control.value) ? null : { customPassword: true }
  };

  static validName(control: AbstractControl): ValidationErrors | null {
    return Regexp.matchingName(control.value) ? null : { customName: true }
  };

  static noMatchEmail(control: AbstractControl): ValidationErrors | null {
    return this._users.allUsers.some((user) => user.email === control.value) ? { hasMatch: true } : null
  };
}
