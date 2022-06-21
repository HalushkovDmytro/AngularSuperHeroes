import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PowerUpsComponent } from "../hero-info-page/power-ups/power-ups.component";
import { PowerUp } from "../../interfaces";
import { HeroInfoService } from "../../hero-info-view/hero-info-service";
import { BattleService } from "./battle-service";
import { of } from "rxjs";
import { delay } from "rxjs/operators";
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-battle-page',
  templateUrl: './battle-page.component.html',
  styleUrls: ['./battle-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BattlePageComponent implements OnInit {
  public showModal: boolean = false;
  public showLoading: boolean = false;

  constructor(
    public powerups: PowerUpsComponent,
    public heroInfoService: HeroInfoService,
    public battleService: BattleService,
    private _cd: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    this._initHeroes();
    this._initPowerupsAndBattleList();
  }

  public battle() {
    this._clearPowerups();
    this.battleService.eraseUsedPowerUp();
    this.battleService.battleResult();
    this.battleService.battleDetails();
    this._initHeroes();
    this._loadingBattleResult();
    localStorage.setItem('powerUps', JSON.stringify(this.battleService.powerUps));
  }

  public trackByFn(index: number, item: PowerUp): string {
    return item.title;
  }

  private _loadingBattleResult() {
    this.showLoading = true;

    setTimeout(() => {
      this.showLoading = false;
      this.showModal = true;
      this._cd.markForCheck();
    }, 5000);
  }

  private _clearPowerups(): void {
    this.battleService.powerUps.forEach( (powerup: PowerUp) => {
      powerup.selected = false;
    });
  }

  private _initHeroes() {
    this.battleService.usersHero = JSON.parse(localStorage.getItem("currentUser")!).selectedHero;
    this.battleService.enemyHero = JSON.parse(localStorage.getItem("currentUser")!).enemyHero;
  }

  private _initPowerupsAndBattleList() {
    this.battleService.powerUps = JSON.parse(localStorage.getItem("powerUps")!);
    this.battleService.battleList = JSON.parse(localStorage["currentUser"]).battleList
      ? JSON.parse(localStorage["currentUser"]).battleList : [];
  }
}
