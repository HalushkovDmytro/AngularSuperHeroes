import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HeroesConfigService } from "./selection-page/heroes.config.service";
import { Router } from "@angular/router";
import { PowerUpsComponent } from "./hero-info-page/power-ups/power-ups.component";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent implements OnInit {
  public params!: string;

  public get heroesService() {
    return this._heroesService;
  }

  constructor(
    public _heroesService: HeroesConfigService,
    public powerUps: PowerUpsComponent,
    public auth: AuthService,
    private route: Router,
  ) {}

  public ngOnInit(): void {
    this._heroesService.initLastSearchLocalStorage();
    this._heroesService.initOwnedHeroes();
    this._heroesService.initSelectedHero();
    this._heroesService.initSearchedHeroes();
    this.powerUps.initPowerUpsArray();
    this.getQueryParams();
  }

  public getQueryParams(): void {
    this.params = this.route.routerState.snapshot.url;
  }

  public goToSelectionPage(): void {
    this.route.navigate(['main/selection-page']);
  }

  public goToUserInfo(): void {
    this.route.navigate(['main/users-info']);
  }

  public goToBattlePage(): void {
    this.route.navigate(['main/battle']);
  }
}
