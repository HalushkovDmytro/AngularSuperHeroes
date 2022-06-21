import { Injectable } from "@angular/core";
import { BattleInfo, BattleScore, HeroInfo, PowerUp } from "../../interfaces";
import { PowerUpsComponent } from "../hero-info-page/power-ups/power-ups.component";
import { HeroesConfigService } from "../selection-page/heroes.config.service";

@Injectable({providedIn: "root"})
export class BattleService {
  public usersHero!: HeroInfo;
  public enemyHero!: HeroInfo;
  public powerUps!: PowerUp[];
  public currentBattleInfo!: BattleInfo;
  public battleList!: BattleInfo[];

  constructor(
    public powerups: PowerUpsComponent,
    public heroesService: HeroesConfigService,
    ) {}

  public battleDetails() {
    this.currentBattleInfo = {
      battleDate: Date.now(),
      heroName: this.usersHero.name,
      heroId: this.usersHero!.id,
      enemyName: this.enemyHero.name,
      enemyId: this.enemyHero!.id,
      battleResult: this.battleResultName()
    };
    this.battleList = [...this.battleList, this.currentBattleInfo];
    localStorage['currentUser'] = JSON.stringify({...JSON.parse(localStorage['currentUser']), battleList: this.battleList});
  }

  public battleResult(): BattleScore {
    const battleScore: BattleScore = {
      usersScore: 0,
      enemyScore: 0
    };

    return this.battlePoints(battleScore);
  }

  public battlePoints(battleScore: BattleScore): BattleScore {
   Object.keys(this.usersHero.powerstats).forEach((powerStat: string) => {
     //@ts-ignore
     const userPoints = +this.usersHero.powerstats[powerStat];
     //@ts-ignore
     const enemyPoints = +this.enemyHero.powerstats[powerStat];

     (userPoints === enemyPoints) ? (++battleScore.usersScore && ++battleScore.enemyScore)
       :(userPoints > enemyPoints) ? battleScore.usersScore++ : battleScore.enemyScore++;
   })
    return battleScore;
  }

  public battleResultName(): string {
    return (this.battleResult().usersScore === this.battleResult().enemyScore)
      ? 'DRAW' : (this.battleResult().usersScore > this.battleResult().enemyScore)
        ? 'WON' : 'LOSE';
  }

  public eraseUsedPowerUp(): void {
    const powerup: PowerUp = this.powerUps.find((powerup: PowerUp) => powerup.usesLeft === 0) as PowerUp;

    if (powerup) {
      const neededIndex = this.powerUps.indexOf(powerup);
      this.powerUps.splice(neededIndex,1);
    }
  }

  public checkPowerUp(powerupTitle: string): void {
    const powerup: PowerUp = this.powerUps.find((powerup: PowerUp) => powerup.title === powerupTitle) as PowerUp;

    powerup.selected = !powerup.selected;

    if (powerup.selected) {
      this._upgradeHeroStats(powerup);
    } else {
      this._downgradeHeroStats(powerup);
    }
  }

  public initEnemyHero(id: string): void {
    const index: number = this._getRandomInt(7);

    let enemyHero = this.heroesService.heroesArr[index];

    if (enemyHero.id === id) {
      enemyHero = this.heroesService.heroesArr.find( (hero: HeroInfo) => hero.id !== this.usersHero.id) as HeroInfo;
    }

    localStorage["currentUser"] = JSON.stringify({...JSON.parse(localStorage["currentUser"]), enemyHero: enemyHero});
  }

  private _upgradeHeroStats(powerup: PowerUp): void {
    const statToUpgrade: string = powerup!.powerStatsName;
    //@ts-ignore
    this.usersHero.powerstats[statToUpgrade] = (+this.usersHero.powerstats[statToUpgrade] + +powerup.powerStatsValue).toString();
    powerup.usesLeft -= 1;
  }

  private _downgradeHeroStats(powerup: PowerUp): void {
    const statToDowngrade = powerup!.powerStatsName;
    //@ts-ignore
    this.usersHero.powerstats[statToDowngrade] = +this.usersHero.powerstats[statToDowngrade] - +powerup.powerStatsValue;
    powerup!.usesLeft += 1;
  }

  private _getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }
}
