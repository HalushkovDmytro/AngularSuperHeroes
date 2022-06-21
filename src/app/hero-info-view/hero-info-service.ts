import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Response } from "../interfaces";

@Injectable({providedIn: "root"})
export class HeroInfoService {
  public heroId!: string;

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

  public getHeroes(): Observable<Response> {
    return this._http.get<Response>(this._getUrl());
  }

  private _getUrl(): string {
    return `https://halushkovdmytro.github.io/JSON-api/fake-data.json`;
  }
}
