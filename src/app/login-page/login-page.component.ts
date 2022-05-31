import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UserValidators} from "../validators";
import {AuthService} from "../auth.service";
import {CreateUserPageComponent} from "../create-user-page/create-user-page.component";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })
  submitted = false
  isUnLogged: boolean
  invalidEnter = false
  sessionExpiredMessage = ''
  logAgainMessage = ''

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ){
    this.isUnLogged = this.auth.isUnLogged
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']){
        this.sessionExpiredMessage = 'Your current session has expired.'
        this.logAgainMessage = 'Please login again to continue using this app!'
      }
    })
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
    })
  }

  get requiredEmail(){
    return this.form.get('email');
  }

  get requiredPassword(){
    return this.form.get('password');
  }

  submit(){
    if (this.form.valid){
      console.log(this.form.value)
      if(this.registeredUser(this.form.value.email, this.form.value.password)){
        this.auth.login(this.form.value)
        this.router.navigate(['/main/selection-page'])
      } else {
        this.invalidEnter = true
        setTimeout(() => {
          this.invalidEnter = false
        }, 2000)

      }
    }
  }

  registeredUser(email: string, password: string): boolean {
    return CreateUserPageComponent.allUsers.some((item) => item.email === email && item.password === password)
  }

}

