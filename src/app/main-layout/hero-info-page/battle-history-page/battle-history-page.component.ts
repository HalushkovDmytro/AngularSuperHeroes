import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BattleInfo, PowerUp } from "../../../interfaces";
import { HeroInfoService } from "../../../hero-info-view/hero-info-service";

@Component({
  selector: 'app-battle-history-page',
  templateUrl: './battle-history-page.component.html',
  styleUrls: ['./battle-history-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BattleHistoryPageComponent implements OnInit {
  public someArray!: BattleInfo[]

 constructor(
    public heroesInfoService: HeroInfoService,
    private _cdr: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {}

  public trackBy(index: number, item: any): PowerUp {
    return item
  }
}
