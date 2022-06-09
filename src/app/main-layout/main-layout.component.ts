import { Component, OnInit } from '@angular/core';
import { HeroesConfigService } from "./selection-page/heroes.config.service";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit{
  
  constructor(private heroesService: HeroesConfigService) {}
  
  public ngOnInit(): void {
    this.heroesService.initLastSearchLocalStorage();
    this.heroesService.initOwnedHeroes();
    this.heroesService.initSelectedHero();
  }
}
