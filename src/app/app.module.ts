import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CreateUserPageComponent } from './create-user-page/create-user-page.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SelectionPageComponent } from './selection-page/selection-page.component';
import { AuthService } from "./auth.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    CreateUserPageComponent,
    MainLayoutComponent,
    SelectionPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
