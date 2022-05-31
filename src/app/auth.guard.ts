import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean | any{
    if(this.auth.isAuthenticated()){
      return true
    } else {
      this.auth.logout()
      this.router.navigate(['/'], {
        queryParams: {
          loginAgain: true
        }
      });
    }
  }
}
