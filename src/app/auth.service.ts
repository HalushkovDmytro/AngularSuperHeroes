import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class AuthService{
  isUnLogged = false
  isLogged = false

  constructor(){}

  login(usersData: any): void{
    this.currentUserInit(usersData)
    this.isLogged = true
    this.isUnLogged = false
  }

  currentUserInit(usersData: any): void{
    localStorage.currentUser = JSON.stringify({...usersData, 'expiredSession': Date.now() + 3600000}) //1hour
  }

  isExpired(): boolean {
    return Date.now() > +JSON.parse(localStorage.getItem('currentUser')!).expiredSession ;
  }

  logout(): void {
    this.isLogged = false;
    localStorage.removeItem('currentUser');
  }

  isAuthenticated(): boolean {
    try{

      if (this.isExpired()) {
        this.isLogged = false;
        this.logout();
        this.isUnLogged = true;
      } else {
        this.isLogged = true;
      }

    } catch (error) { }
    return this.isLogged;
  }
}
