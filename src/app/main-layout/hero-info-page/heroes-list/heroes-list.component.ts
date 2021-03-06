import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { HeroesConfigService } from "../../selection-page/heroes.config.service";
import { Router } from "@angular/router";
import { HeroInfo, PowerUp } from "../../../interfaces";

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesListComponent {
  @Input() hero!: HeroInfo

  constructor(
    public heroesService: HeroesConfigService,
    private _router: Router,
    ) {}

  public goToSelectPage(): void {
    this._router.navigate(['main/selection-page'])
      .then(() => window.scrollTo(0, 0) );
  }

  public trackBy(index: number, item: HeroInfo): string {
    return item.id;
  }
}
