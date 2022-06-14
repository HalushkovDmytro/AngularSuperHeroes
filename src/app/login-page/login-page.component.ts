import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { UserValidators } from "../validators";
import { AuthService } from "../auth.service";
import { UsersService } from "../users.service";
import { PowerUpService } from "../power-up.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  public submitted: boolean = false;
  public invalidEnter: boolean = false;
  public sessionExpiredMessage: string = '';
  public logAgainMessage: string = '';

  public get requiredEmail(): AbstractControl | null {
    return this.form.get('email');
  }

  public get requiredPassword(): AbstractControl | null {
    return this.form.get('password');
  }

  public get formValue(){
    return this.form.value
  };

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _users: UsersService
  ){}

  public ngOnInit(): void {
    this.createForm();
    this.addParamsListener();
  }

  public createForm() {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        UserValidators.validEmail
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        UserValidators.validPassword
      ]),
    });
  }

  public addParamsListener() {
    this._route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.sessionExpiredMessage = 'Your current session has expired.';
        this.logAgainMessage = 'Please login again to continue using this app!';
      }
    })
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    if (this._registeredUser(this.formValue.email, this.formValue.password)) {
      this._auth.login(this.formValue);
      this._router.navigate(['/main/selection-page']);
      PowerUpService.powerUptoLocalStorage()
    } else {
      this.invalidEnter = true;
      setTimeout(() => {
        this.invalidEnter = false;
      }, 2000)
    }
  }

  private _registeredUser(email: string, password: string): boolean {
    return UsersService.allUsers.some((item) => item.email === email && item.password === password);
  }

}

