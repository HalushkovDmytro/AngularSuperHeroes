import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PowerUp } from "../../../interfaces";

@Component({
  selector: 'app-power-ups',
  templateUrl: './power-ups.component.html',
  styleUrls: ['./power-ups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PowerUpsComponent implements OnInit {

  public powerUpsArray!: PowerUp[];

  public ngOnInit(): void {
    this.initPowerUpsArray();
    this._sortPowerUps();
  }

  public initPowerUpsArray() {
    return this.powerUpsArray = JSON.parse(localStorage["powerUps"]);
  }

  public trackByFn(index: number, item: PowerUp): string {
    return item.title;
  }

  private _sortPowerUps(): void {
    this.powerUpsArray.sort((a,b) => b.usesLeft - a.usesLeft);
  }
}
