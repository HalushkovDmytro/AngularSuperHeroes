import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BattleInfo } from "../../../interfaces";
import { HeroInfoService } from "../../../hero-info-view/hero-info-service";

@Component({
  selector: 'app-battle-history-page',
  templateUrl: './battle-history-page.component.html',
  styleUrls: ['./battle-history-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BattleHistoryPageComponent implements OnInit {
  public battleList!: BattleInfo[];

 constructor(
    public heroesInfoService: HeroInfoService,
  ) { }

  public ngOnInit() {
   this._initBattleList();
  }

  public trackByFn(index: number, item: BattleInfo): string {
    return item.battleDate;
  }

  public sortByDate(): void {
   this._sortBattles('date');
  }

  public sortByHeroName(): void {
    this._sortBattles('heroName');
  }

  public sortByEnemyName(): void {
    this._sortBattles('enemyName');
  }

  public sortByBattleResult(): void {
    this._sortBattles('battleResult');
  }

  private _sortBattles(sortBy: string) {
    switch (sortBy) {

      case 'date':
        this.battleList.sort((a,b) => a.battleDate - b.battleDate);
        break;

      case 'heroName':
        this.battleList.sort((a, b) => a.heroName.localeCompare(b.heroName));
        break;

      case 'enemyName':
        this.battleList.sort((a, b) => a.enemyName.localeCompare(b.enemyName));
        break;

      case 'battleResult':
        this.battleList.sort((a, b) => b.battleResult.localeCompare(a.battleResult));
        break;
    }
  }

  private _initBattleList() {
    this.battleList = JSON.parse(localStorage["currentUser"]).battleList;
  }
}
