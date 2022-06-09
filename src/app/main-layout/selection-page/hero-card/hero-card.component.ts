import { Component } from '@angular/core';
import { HeroesConfigService } from "../heroes.config.service";

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss']
})
export class HeroCardComponent {
  constructor(public heroesService: HeroesConfigService) { }

  public selectHero(event: Event): void {
    const target = event.target as HTMLInputElement
    const selectedHero = this.heroesService.heroesArr.find((hero) => hero.id === target.id)
    const alreadySelected = this.heroesService.ownedHeroes.some((hero) => hero.id === selectedHero.id)

    if (!alreadySelected) {
      this.setOwnedHeroes(selectedHero);
    } else {
      this.removeFromOwned(target.id)
    }
  }

  public trySelected(id: string): boolean {
    const isSelected = this.heroesService.selectedHero?.id

    return isSelected === id;
  }

  public tryOwned(id: string): boolean {
    return this.heroesService.ownedHeroes.some((hero) => hero.id === id);
  }

  public removeFromOwned(id: string): void{
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

  public setOwnedHeroes(hero: any): void {
    this.heroesService.ownedHeroes.push(hero);

    const lastIndex = this.heroesService.ownedHeroes.length - 1;

    this.heroesService.selectedHero = this.heroesService.ownedHeroes[lastIndex];
    localStorage["currentUser"] = JSON.stringify(
      {...JSON.parse(localStorage["currentUser"]),
        ownedHeroes: [...this.heroesService.ownedHeroes],
        selectedHero: this.heroesService.selectedHero}
    );
  }
}
