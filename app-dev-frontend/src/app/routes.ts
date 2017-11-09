import {Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {ErrorComponent} from "./pages/error/error.component";

export const appRoutes: Routes = [
  {path: '', redirectTo: 'help', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', component: ErrorComponent}
];
