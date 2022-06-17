import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HeroesConfigService } from "./selection-page/heroes.config.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent implements OnInit {
  public params!: string ;
  constructor(
    private _heroesService: HeroesConfigService,
    private route: Router,
    private _cdr: ChangeDetectorRef
    ) {}

  public ngOnInit(): void {
    this._heroesService.initLastSearchLocalStorage();
    this._heroesService.initOwnedHeroes();
    this._heroesService.initSelectedHero();
    this._heroesService.initSearchedHeroes();
    this.getQueryParams();
  }
  
    public getQueryParams(): void {
    this.params = this.route.routerState.snapshot.url
  }  

  public goToSelectionPage(): void {
    this.route.navigate(['main/selection-page'])
  }

  public goToUserInfo(): void {
    this.route.navigate(['main/users-info'])
  }
  
  public goToBattlePage(): void {
    this.route.navigate(['main/battle'])
  
  }
}
