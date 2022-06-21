import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { UserValidators } from "../validators";
import { UsersData } from "../interfaces";
import { UsersService } from "../users.service";

@Component({
  selector: 'app-create-user-page',
  templateUrl: './create-user-page.component.html',
  styleUrls: ['./create-user-page.component.scss']
})
export class CreateUserPageComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    userName: new FormControl('')
  });
  public created: boolean = false;

  public get requiredEmail(): AbstractControl | null {
    return this.form.get('email');
  };

  public get requiredPassword(): AbstractControl | null {
    return this.form.get('password');
  };

  public get requiredUsername(): AbstractControl | null {
    return this.form.get('userName');
  };

  constructor(private _usersService: UsersService) {}

  public ngOnInit(): void {
    this.createForm();
  };

  public createForm(): void {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        UserValidators.validEmail,
        UserValidators.noMatchEmail(this._usersService.allUsers)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        UserValidators.validPassword
      ]),
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        UserValidators.validName
      ])
    });
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    this._addUser(this.form.value);
    this.created = true;
    this.form.reset(
      {
        email: '',
        password: '',
        userName:''
      }
    );
  };

  private _addUser(user: UsersData): void {
    let allUsersArray: UsersData[] = this._usersService.allUsers
    const sameUser: boolean = allUsersArray.some( (item: UsersData) => item.email === user.email);

    if (!sameUser) {
      allUsersArray = [...allUsersArray, user]
      localStorage['users'] = JSON.stringify(allUsersArray);
    }
  };
}
