import {Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {ErrorComponent} from "./pages/error/error.component";
import {RegisterComponent} from "./pages/register/register.component";
import {NewAdComponent} from "./pages/ad/new-ad/new-ad.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {MyAdsComponent} from "./pages/ad/my-ads/my-ads.component";
import {AdsComponent} from "./pages/admin/ads/ads.component";

export const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'ad/new', component: NewAdComponent},
  {path: 'ad/own', component: MyAdsComponent},
  {path: 'admin/ads', component: AdsComponent},
  {path: '**', component: ErrorComponent}
];
