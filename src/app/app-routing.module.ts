import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from "./login-page/login-page.component";
import { CreateUserPageComponent } from "./create-user-page/create-user-page.component";
import { MainLayoutComponent } from "./main-layout/main-layout.component";
import { AuthGuard } from "./auth.guard";
import { SelectionPageComponent } from "./main-layout/selection-page/selection-page.component";

const routes: Routes = [
  {path: '', redirectTo: 'login-page', pathMatch: 'full' },
  {path: 'login-page', component: LoginPageComponent},
  {path: 'create-new-user', component: CreateUserPageComponent},
  {path: 'main', component: MainLayoutComponent, canActivate: [AuthGuard], children: [
      {path: 'selection-page', component: SelectionPageComponent},
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
