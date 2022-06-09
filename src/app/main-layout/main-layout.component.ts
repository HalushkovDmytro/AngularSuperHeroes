import { Component, OnInit } from '@angular/core';
import { HeroesConfigService } from "./selection-page/heroes.config.service";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit{
  
  constructor(private _heroesService: HeroesConfigService) {}
  
  public ngOnInit(): void {
    this._heroesService.initLastSearchLocalStorage();
    this._heroesService.initOwnedHeroes();
    this._heroesService.initSelectedHero();
  }
}
