import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn: "root"})
export class HeroInfoService {
  public heroId!: string

  constructor(
    private _router: Router,
    private _http: HttpClient
  ) {}

  public redirectToHero(heroId: string): void {
    this._router.navigate(['/main/hero-info'], {
      queryParams: {
        heroId: heroId
      }
    });
    this.heroId = heroId;
  }

}
