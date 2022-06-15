import { Component } from '@angular/core';
import { PowerUp } from "../../../interfaces";

@Component({
  selector: 'app-power-ups',
  templateUrl: './power-ups.component.html',
  styleUrls: ['./power-ups.component.scss']
})
export class PowerUpsComponent {

  public powerUpsArray: PowerUp[] = JSON.parse(localStorage["powerUps"]);

  public trackBy(index: number, item: any): PowerUp {
    return item
  }

}
