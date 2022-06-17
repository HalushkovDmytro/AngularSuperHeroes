import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HeroInfoService } from "./hero-info-service";
import { HeroesConfigService } from "../main-layout/selection-page/heroes.config.service";
import { FetchResult, Response } from "../interfaces";
import { Subscription } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-hero-info-view',
  templateUrl: './hero-info-view.component.html',
  styleUrls: ['./hero-info-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroInfoViewComponent implements OnInit {
  public hero!: FetchResult;

  constructor(
    private _heroInfoService: HeroInfoService,
    private _heroConfigService: HeroesConfigService,
    private _http: HttpClient,
    private _cd: ChangeDetectorRef
    ) { }

  public ngOnInit(): void {
    this._getHeroes();
  }

  private _getUrl(): string {
    return `https://halushkovdmytro.github.io/JSON-api/fake-data.json`;
  }

  private _getHeroes(): Subscription {
    return this._http.get<Response>(this._getUrl())
      .subscribe((heroes) => {
        this._viewHero(heroes)
        this._cd.markForCheck()
      })
  }

  private _viewHero(response: Response): void {
        
    if (response.results) {
      this.hero = response.results.find((hero: FetchResult) => hero.id === this._heroInfoService.heroId) as FetchResult;
    }
  }
}
