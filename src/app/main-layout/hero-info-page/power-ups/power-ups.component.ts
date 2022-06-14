import { Component } from '@angular/core';
import { PowerUp } from "../../../interfaces";

@Component({
  selector: 'app-power-ups',
  templateUrl: './power-ups.component.html',
  styleUrls: ['./power-ups.component.scss']
})
export class PowerUpsComponent {

  public powerUpsArray: PowerUp[] = JSON.parse(localStorage["powerUps"]);

  public checkUse(powerName: string): void {
    const selectedPowerUp = this.powerUpsArray.find((item) => item.title === powerName);

    if (selectedPowerUp!.usesLeft === 1) {
      const neededIndex = this.powerUpsArray.indexOf(selectedPowerUp!)
      this.powerUpsArray.splice(neededIndex,1)
    }

    selectedPowerUp!.usesLeft -= 1;
    localStorage.setItem("powerUps", JSON.stringify(this.powerUpsArray))
    this.powerUpsArray.sort((a,b) => b.usesLeft - a.usesLeft)
  }

  public trackBy(index: number, item: any): PowerUp {
    return item
  }

}
