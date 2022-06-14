import { Component, OnInit } from '@angular/core';
import { HeroesConfigService } from "./selection-page/heroes.config.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(
    private _heroesService: HeroesConfigService,
    private route: Router
    ) {}

  public ngOnInit(): void {
    this._heroesService.initLastSearchLocalStorage();
    this._heroesService.initOwnedHeroes();
    this._heroesService.initSelectedHero();
    this._heroesService.initSearchedHeroes();
  }

  public goToSelectionPage(): void {
    this.route.navigate(['main/selection-page'])
  }

  public goToUserInfo(): void {
    this.route.navigate(['main/users-info'])
  }
}
