import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroInfo, Response } from "../../interfaces";
import { Subscription } from "rxjs";

@Injectable({providedIn: 'root'})
export class HeroesConfigService {
  public heroesArr!: HeroInfo[];
  public searchedHeroes!: HeroInfo[];
  public ownedHeroes!: HeroInfo[];
  public selectedHero!: HeroInfo;
  public lastSearch!: string;
  public noHeroError!: string;

  constructor(private _http: HttpClient) { }

  public getUrl(searchValue: string): string {
    return `https://halushkovdmytro.github.io/JSON-api/fake-data.json`;
  }

  public getHeroes(value: string): Subscription {
    return this._http.get<Response>(this.getUrl(value))
      .subscribe((heroes) => {
        heroes = JSON.parse(JSON.stringify(heroes))
        this._showHeroes(heroes)
      })
  }

  private _showHeroes(response: any): void {
    const success: string = 'success'

    if (response.response === success) {
      this.noHeroError = ''
      localStorage["currentUser"] = JSON.stringify({...JSON.parse(localStorage["currentUser"]), searchedHeroes: response.results })
      this.heroesArr = JSON.parse(localStorage["currentUser"]).searchedHeroes
    }

     this.noHeroError = response.error
  }

  public initOwnedHeroes(): void {
    this.ownedHeroes = JSON.parse(localStorage['currentUser']).ownedHeroes
      ? JSON.parse(localStorage['currentUser']).ownedHeroes : [];
  }

  public initSelectedHero(): void {
    this.selectedHero = JSON.parse(localStorage['currentUser'])?.selectedHero;
  }

  public initLastSearchLocalStorage(): void {
    this.lastSearch = JSON.parse(localStorage["currentUser"])?.lastSearch;
  }

  public initSearchedHeroes(): void {
    this.heroesArr = JSON.parse(localStorage["currentUser"])?.searchedHeroes;
  }

}
