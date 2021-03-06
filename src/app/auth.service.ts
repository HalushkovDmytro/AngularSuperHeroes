import { Injectable } from "@angular/core";
import { UsersData } from "./interfaces";

@Injectable({providedIn: 'root'})
export class AuthService {
  private _isLogged: boolean = false

  public login(usersData: UsersData): void {
    this._currentUserInit(usersData);
    this._isLogged = true;
  }

  public logout(): void {
    this._isLogged = false;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('powerUps');
  }

  public isAuthenticated(): boolean {
    try {
      if (this._isExpired()) {
        this._isLogged = false;
        this.logout();
      } else {
        this._isLogged = true;
      }
    } catch (error: any) {}
    return this._isLogged;
  }

  private _isExpired(): boolean {
    return Date.now() > +JSON.parse(localStorage.getItem('currentUser')!).expiredSession ;
  }

  private _currentUserInit(usersData: UsersData): void {
    localStorage.currentUser = JSON.stringify({...usersData, 'expiredSession': Date.now() + 3600000});
  }
}
