import { Component, Input, OnInit } from '@angular/core';
import { HeroesConfigService } from "../heroes.config.service";
import { HeroInfoService } from "../../../hero-info-view/hero-info-service";
import { HeroInfo } from "../../../interfaces";
import { BattleService } from "../../battle-page/battle-service";

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss'],

})
export class HeroCardComponent implements OnInit {
  @Input() hero!: HeroInfo;
  public isOwned!: boolean;

  constructor(
    public heroesService: HeroesConfigService,
    public heroesInfoService: HeroInfoService,
    public battleService: BattleService,

) { }

  public ngOnInit(): void {
    this._checkIsOwned();
  }

  public selectHero(id: string): void {
    const selectedHero = this.heroesService.heroesArr.find((hero: HeroInfo) => hero.id === id);
    const alreadySelected = this.heroesService.ownedHeroes.some((hero: HeroInfo) => hero.id === selectedHero!.id);


    if (!alreadySelected) {
      this._setOwnedHeroes(selectedHero);
    } else {
      this._removeFromOwned(id);
    }

    this._checkIsOwned();
    this.battleService.initEnemyHero(id);
  }

  public trySelected(id: string): boolean {
    const isSelected: string = this.heroesService.selectedHero?.id ? this.heroesService.selectedHero?.id : 'false';

    return isSelected === id;
  }

  public tryOwned(id: string): boolean {
    return this.heroesService.ownedHeroes.some((hero: HeroInfo) => hero.id === id);
  }

  private _setOwnedHeroes(hero: any): void {
    this.heroesService.ownedHeroes = [...this.heroesService.ownedHeroes, hero]

    const lastIndex = this.heroesService.ownedHeroes.length - 1;

    this.heroesService.selectedHero = this.heroesService.ownedHeroes[lastIndex];
    this._refreshCurrentUser();
  }

  private _removeFromOwned(id: string): void {
    this.heroesService.ownedHeroes = this.heroesService.ownedHeroes.filter((hero: HeroInfo) => {
      return hero.id !== id;
    });

    const lastIndex = this.heroesService.ownedHeroes.length - 1;

    this.heroesService.selectedHero = this.heroesService.ownedHeroes[lastIndex];
    this._refreshCurrentUser();
  }

  private _refreshCurrentUser(): void {
    localStorage['currentUser'] = JSON.stringify(
      {...JSON.parse(localStorage['currentUser']),
        ownedHeroes: [...this.heroesService.ownedHeroes],
        selectedHero: this.heroesService.selectedHero
      }
    );
  }

  private _checkIsOwned(): boolean {
    return this.isOwned = this.heroesService.ownedHeroes.some((item: HeroInfo) => item.id === this.hero.id);
  }

}
