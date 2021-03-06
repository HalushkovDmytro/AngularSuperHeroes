import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Regexp } from "./regexp";
import { UsersService } from "./users.service";
import { UsersData } from "./interfaces";

export class UserValidators {

  static validEmail(control: AbstractControl): ValidationErrors | null {
    return Regexp.matchingEmail(control.value) ? null : {customEmail: true}
  };

  static validPassword(control: AbstractControl): ValidationErrors | null {
    return Regexp.matchingPassword(control.value) ? null : { customPassword: true }
  };

  static validName(control: AbstractControl): ValidationErrors | null {
    return Regexp.matchingName(control.value) ? null : { customName: true }
  };

  static validSearchHeroes(control: AbstractControl): ValidationErrors | null {
    return Regexp.matchingHeroSearch(control.value) ? null : { invalidName: true }
  };

  static noMatchEmail(usersList: UsersData[]): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl) => {
      return usersList.some((user: UsersData) => user.email === control.value) ? { hasMatch: true } : null
    }
  };
}
