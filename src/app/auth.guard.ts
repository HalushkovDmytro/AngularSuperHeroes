import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor (private _auth: AuthService, private _router: Router) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean | any {
    if (this._auth.isAuthenticated()) {
      return true;
    } else {
      this._auth.logout();
      this._router.navigate(['/'], {
        queryParams: {
          loginAgain: true
        }
      });
    }
  };
}
