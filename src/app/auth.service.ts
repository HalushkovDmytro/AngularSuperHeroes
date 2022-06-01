import { Injectable } from "@angular/core";
import { UsersData } from "./interfaces";

@Injectable({providedIn: 'root'})
export class AuthService{
  public isUnLogged: boolean = false
  private _isLogged: boolean = false

  public login(usersData: UsersData): void{
    AuthService.currentUserInit(usersData);
    this._isLogged = true;
    this.isUnLogged = false;
  }

  static currentUserInit(usersData: UsersData): void{
    localStorage.currentUser = JSON.stringify({...usersData, 'expiredSession': Date.now() + 3600000}) //1hour
  }

  static isExpired(): boolean {
    return Date.now() > +JSON.parse(localStorage.getItem('currentUser')!).expiredSession ;
  }

  public logout(): void {
    this._isLogged = false;
    this.isUnLogged = true;
    localStorage.removeItem('currentUser');
  }

  public isAuthenticated(): boolean {
    try {

      if (AuthService.isExpired()) {
        this._isLogged = false;
        this.logout();
        this.isUnLogged = true;
      } else {
        this._isLogged = true;
      }

    } catch (error: any) { }
    return this._isLogged;
  }
}
