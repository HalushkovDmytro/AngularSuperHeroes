import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroInfo } from "../../interfaces";

@Injectable({providedIn: 'root'})
export class HeroesConfigService {
  public heroesArr!: any[];
  public heroes!: HeroInfo[];
  public ownedHeroes!: HeroInfo[];
  public selectedHero!: HeroInfo;
  public lastSearch!: string;
  public noHeroError!: string;

  constructor(public http: HttpClient) { }

  public getUrl(searchValue: string): string {
    return `https://superheroapi.com/api.php/5287932121267889/search/${searchValue}`;
  }

  public getHeroes(value: string){
    return this.http.get(this.getUrl(value))
      .subscribe((heroes) => {
        this.showHeroes(heroes)
      })
  }

  public showHeroes(response: any): void {
    if (response.response === 'success') {
      this.heroesArr = response.results
      this.noHeroError = ''
    } else if (response.response === 'error') {
      this.noHeroError = response.error
      console.log(response.error)
    }
  }

  public initOwnedHeroes(): void {
    this.ownedHeroes = JSON.parse(localStorage['currentUser']).ownedHeroes
      ? JSON.parse(localStorage['currentUser']).ownedHeroes : []
  }

  public initSelectedHero(): void {
    this.selectedHero = JSON.parse(localStorage['currentUser'])?.selectedHero
  }

  public initLastSearchLocalStorage(): void {
    this.lastSearch = JSON.parse(localStorage["currentUser"])?.lastSearch;
  }

}
