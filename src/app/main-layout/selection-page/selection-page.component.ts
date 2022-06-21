import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { UserValidators } from "../../validators";
import { HeroesConfigService } from "./heroes.config.service";
import { HeroInfo, Response } from "../../interfaces";

@Component({
  selector: 'app-selection-page',
  templateUrl: './selection-page.component.html',
  styleUrls: ['./selection-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectionPageComponent implements OnInit {
  public recentSearch: Set<string> = new Set();
  public recentSearchArray: string[] = Array.from(this.recentSearch);
  public form = this._fb.group({
    heroSearch: ['', [Validators.required, UserValidators.validSearchHeroes]]
  })

  public get nameGetter(): AbstractControl | null {
    return this.form.get('heroSearch');
  }

  public get heroSearch(): string {
    return this.form.value.heroSearch;
  }

  constructor(
    private _fb: FormBuilder,
    public heroesService: HeroesConfigService,
  ) {}

  public ngOnInit(): void {
    this._initRecentSearch();
  }

  public addToRecentSearch(heroName: string): void {
    this.recentSearch = new Set<string>([...this.recentSearch, heroName]);
    this.recentSearchArray = [...this.recentSearchArray, heroName];
    localStorage.setItem("recentSearch", JSON.stringify([ ...this.recentSearch]));
  }

  public getHeroes(value: string) {
    this.heroesService.getHeroes(value)
      .subscribe((heroes: Response): void => {
        heroes = JSON.parse(JSON.stringify(heroes));
        this.heroesService.showHeroes(heroes);
      })
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.heroesService.lastSearch = this.heroSearch;
    this.getHeroes(this.heroSearch);
    this.addToRecentSearch(this.heroSearch);
    this._setLastSearch();
  }

  public searchFromRecent(item: string): void {
    this.form.controls.heroSearch.setValue(item);
    this.submit();
  }

  public trackByFn(index: number, item: HeroInfo): string {
    return item.id;
  }

  private _initRecentSearch(): void {
    const recentSearch = localStorage["recentSearch"];
    
    if (!recentSearch) {
      return;
    }

    JSON.parse(recentSearch).forEach((item: string) => this.recentSearch.add(item));
  }

  private _setLastSearch(): void {
    const lastIndex: number = this.recentSearchArray.length - 1;

    this.heroesService.lastSearch = this.recentSearchArray[lastIndex];
    localStorage["currentUser"] = JSON.stringify(
      {...JSON.parse(localStorage["currentUser"]),
        lastSearch: this.heroesService.lastSearch}
    );
  }
}
