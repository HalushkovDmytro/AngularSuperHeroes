import { Injectable } from "@angular/core";
import { PowerUp } from "./interfaces";

@Injectable({providedIn: 'root'})
export class PowerUpService {

  public initPowerUp(): PowerUp[] {
    return [
      {title: "Captain America shield", powerStatsName: "durability", powerStatsValue: "10", usesLeft: 5, image: "https://halushkovdmytro.github.io/JSON-api/powerups/1.jpg", selected: false},
      {title: "Mjolnir", powerStatsName: "power", powerStatsValue: "10", usesLeft: 5, image: "https://halushkovdmytro.github.io/JSON-api/powerups/2.jpg", selected: false},
      {title: "Ironman nano armor", powerStatsName: "combat", powerStatsValue: "10", usesLeft: 5, image: "https://halushkovdmytro.github.io/JSON-api/powerups/3.jpg", selected: false},
      {title: "Dr. Strange's cloak", powerStatsName: "intelligence", powerStatsValue: "10", usesLeft: 5, image: "https://halushkovdmytro.github.io/JSON-api/powerups/4.png", selected: false},
      {title: "Green lantern's ring", powerStatsName: "strength", powerStatsValue: "10", usesLeft: 5, image: "https://halushkovdmytro.github.io/JSON-api/powerups/5.jpg", selected: false},
      {title: "Flash boots", powerStatsName: "speed", powerStatsValue: "10", usesLeft: 5, image: "https://halushkovdmytro.github.io/JSON-api/powerups/6.jpg", selected: false}
    ]
  }

  public saveToLocalStorage() {
    localStorage.setItem("powerUps", JSON.stringify(this.initPowerUp()));
  }
}
