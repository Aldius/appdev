import {Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {ErrorComponent} from "./pages/error/error.component";
import {RegisterComponent} from "./pages/register/register.component";
import {NewAdComponent} from "./pages/ad/new-ad/new-ad.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {MyAdsComponent} from "./pages/ad/my-ads/my-ads.component";
import {AdsComponent} from "./pages/admin/ads/ads.component";
import {ReportsComponent} from "./pages/admin/reports/reports.component";
import {UsersComponent} from "./pages/admin/users/users.component";
import {NewMessageComponent} from "./pages/messages/new/new.component";
import {GotMessageComponent} from "./pages/messages/got/got.component";
import {SentMessageComponent} from "./pages/messages/sent/sent.component";

export const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'ad/new', component: NewAdComponent},
  {path: 'ad/own', component: MyAdsComponent},
  {path: 'admin/ads', component: AdsComponent},
  {path: 'admin/reports', component: ReportsComponent},
  {path: 'admin/users', component: UsersComponent},
  {path: 'message', component: NewMessageComponent},
  {path: 'message/got', component: GotMessageComponent},
  {path: 'message/sent', component: SentMessageComponent},
  {path: '**', component: ErrorComponent}
];
