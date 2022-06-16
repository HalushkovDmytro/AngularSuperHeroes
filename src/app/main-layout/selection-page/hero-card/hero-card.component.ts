import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { HeroesConfigService } from "../heroes.config.service";
import { HeroInfoService } from "../../../hero-info-view/hero-info-service";

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class HeroCardComponent implements OnInit{
  @Input() hero!: any;
  public isOwned!: boolean;

  constructor(
    public heroesService: HeroesConfigService,
    public heroesInfoService: HeroInfoService,
    private _cds: ChangeDetectorRef
    ) { }

  public ngOnInit() {
    this._checkIsOwned()
  }

  public selectHero(event: Event): void {
    const target = event.target as HTMLInputElement
    const selectedHero = this.heroesService.heroesArr.find((hero) => hero.id == target.id)
    const alreadySelected = this.heroesService.ownedHeroes.some((hero) => hero.id === selectedHero!.id)
    
    if (!alreadySelected) {
      this._setOwnedHeroes(selectedHero);
      this._checkIsOwned()
    } else {
      this._removeFromOwned(target.id)
      this._checkIsOwned()
    }

    this._cds.markForCheck()
  }

  public trySelected(id: string): boolean {
    const isSelected: string = this.heroesService.selectedHero?.id ? this.heroesService.selectedHero?.id : 'false'
    
    this._cds.markForCheck()
    return isSelected === id;
  }

  public tryOwned(id: string): boolean {
    this._cds.markForCheck()
    return this.heroesService.ownedHeroes.some((hero) => hero.id === id);
  }

  private _setOwnedHeroes(hero: any): void {
    this._cds.markForCheck()
    this.heroesService.ownedHeroes = [...this.heroesService.ownedHeroes, hero]

    const lastIndex = this.heroesService.ownedHeroes.length - 1;

    this.heroesService.selectedHero = this.heroesService.ownedHeroes[lastIndex];
    localStorage["currentUser"] = JSON.stringify(
      {...JSON.parse(localStorage["currentUser"]),
        ownedHeroes: [...this.heroesService.ownedHeroes],
        selectedHero: this.heroesService.selectedHero}
    );
  }

  private _removeFromOwned(id: string): void {
    this._cds.markForCheck()
    
    this.heroesService.ownedHeroes = this.heroesService.ownedHeroes.filter((item) => {
      return item.id !== id
    });

    const lastIndex = this.heroesService.ownedHeroes.length - 1;

    this.heroesService.selectedHero = this.heroesService.ownedHeroes[lastIndex];
    localStorage['currentUser'] = JSON.stringify(
      {...JSON.parse(localStorage['currentUser']),
        ownedHeroes: this.heroesService.ownedHeroes,
        selectedHero: this.heroesService.selectedHero
      }
    );
  }

  private _checkIsOwned(): boolean {
    this._cds.markForCheck()
    
    return this.isOwned = this.heroesService.ownedHeroes.some(item => item.id === this.hero.id)
  }

}
