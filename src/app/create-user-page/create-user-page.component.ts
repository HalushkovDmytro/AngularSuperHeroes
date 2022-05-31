import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserValidators} from "../validators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-create-user-page',
  templateUrl: './create-user-page.component.html',
  styleUrls: ['./create-user-page.component.scss']
})

export class CreateUserPageComponent implements OnInit {

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    userName: new FormControl('')
  })
  created = false

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        UserValidators.validEmail,
        UserValidators.noMatchEmail
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
    })
  }

  get requiredEmail(){
    return this.form.get('email');
  }

  get requiredPassword(){
    return this.form.get('password');
  }

  get requiredUsername(){
    return this.form.get('userName')
  }

  static allUsers: Array<any> = JSON.parse(localStorage.getItem('users')!)
    ? JSON.parse(localStorage.getItem('users')!)
    : [];

  addUser(user: any): void {
    const sameUser = CreateUserPageComponent.allUsers.some((item) => item.email === user.email)

    if(!sameUser){
      CreateUserPageComponent.allUsers.push(user)
      localStorage['users'] = JSON.stringify(CreateUserPageComponent.allUsers);
    }
  }

  submit(){
    if (this.form.valid){
      console.log(this.form.value)
      this.addUser(this.form.value);
      this.created = true
      this.form.reset(
        {
          email: '',
          password: '',
          userName:''
        }
      );
    }
  }
}
