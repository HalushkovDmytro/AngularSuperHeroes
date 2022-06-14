import { Injectable } from "@angular/core";
import { PowerUp } from "./interfaces";

@Injectable({providedIn: 'root'})
export class PowerUpService {

  static initPowerUp(): PowerUp[] {
    return [
      {title: "Captain America shield", powerStatsName: "durability", powerStatsValue: "10", usesLeft: 5, image: "https://halushkovdmytro.github.io/JSON-api/powerups/1.jpg"},
      {title: "Mjolnir", powerStatsName: "power", powerStatsValue: "10", usesLeft: 5, image: "https://halushkovdmytro.github.io/JSON-api/powerups/2.jpg"},
      {title: "Ironman nano armor", powerStatsName: "combat", powerStatsValue: "10", usesLeft: 5, image: "https://halushkovdmytro.github.io/JSON-api/powerups/3.jpg"},
      {title: "Dr. Strange's cloak", powerStatsName: "intelligence", powerStatsValue: "10", usesLeft: 5, image: "https://halushkovdmytro.github.io/JSON-api/powerups/4.png"},
      {title: "Green lantern's ring", powerStatsName: "strength", powerStatsValue: "10", usesLeft: 5, image: "https://halushkovdmytro.github.io/JSON-api/powerups/5.jpg"},
      {title: "Flash boots", powerStatsName: "speed", powerStatsValue: "10", usesLeft: 5, image: "https://halushkovdmytro.github.io/JSON-api/powerups/6.jpg"}
    ]
  }

  static powerUptoLocalStorage(){
    localStorage.setItem("powerUps", JSON.stringify(PowerUpService.initPowerUp()))
  }
}
