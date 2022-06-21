import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { HeroInfo } from "../../interfaces";

@Component({
  selector: 'app-hero-info-page',
  templateUrl: './users-hero-info-page.component.html',
  styleUrls: ['./users-hero-info-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersHeroInfoPageComponent {
  @Input() hero!: HeroInfo;

  public heroesList: string = 'heroes';
  public battleList: string = 'battle';
  public powerups: string = 'powerups';
  public render: string = this.heroesList;

  public showUserHeroesList(): void {
    this.render = this.heroesList;
  }

  public showBattlesHistory(): void {
    this.render = this.battleList;
  }

  public showPowerups(): void {
    this.render = this.powerups;
  }
}
