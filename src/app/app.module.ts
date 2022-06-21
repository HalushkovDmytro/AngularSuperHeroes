import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CreateUserPageComponent } from './create-user-page/create-user-page.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AuthService } from "./auth.service";
import { SelectionPageComponent } from "./main-layout/selection-page/selection-page.component";
import { AlphabetSearchComponent } from './main-layout/selection-page/alphabet-search/alphabet-search.component';
import { RecentSearchComponent } from './main-layout/selection-page/recent-search/recent-search.component';
import { HeroCardComponent } from './main-layout/selection-page/hero-card/hero-card.component';
import { UsersHeroInfoPageComponent } from './main-layout/hero-info-page/users-hero-info-page.component';
import { HeroesListComponent } from './main-layout/hero-info-page/heroes-list/heroes-list.component';
import { BattleHistoryPageComponent } from './main-layout/hero-info-page/battle-history-page/battle-history-page.component';
import { PowerUpsComponent } from './main-layout/hero-info-page/power-ups/power-ups.component';
import { HeroInfoViewComponent } from './hero-info-view/hero-info-view.component';
import { BattlePageComponent } from './main-layout/battle-page/battle-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    CreateUserPageComponent,
    MainLayoutComponent,
    SelectionPageComponent,
    AlphabetSearchComponent,
    RecentSearchComponent,
    HeroCardComponent,
    UsersHeroInfoPageComponent,
    HeroesListComponent,
    BattleHistoryPageComponent,
    PowerUpsComponent,
    HeroInfoViewComponent,
    BattlePageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService, PowerUpsComponent, BattlePageComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
