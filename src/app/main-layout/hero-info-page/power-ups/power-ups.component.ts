import { Component, OnInit } from '@angular/core';
import { PowerUp } from "../../../interfaces";

@Component({
  selector: 'app-power-ups',
  templateUrl: './power-ups.component.html',
  styleUrls: ['./power-ups.component.scss']
})
export class PowerUpsComponent implements OnInit {

  public powerUpsArray: PowerUp[] = JSON.parse(localStorage["powerUps"]);
  
  public ngOnInit(): void {
    this.powerUpsArray.sort((a,b) => b.usesLeft - a.usesLeft)
  }
  
  public trackBy(index: number, item: any): PowerUp {
    return item
  }

}
