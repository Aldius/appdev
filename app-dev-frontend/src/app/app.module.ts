import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import 'rxjs/Rx';

import { AppComponent } from './app.component';
import  {appRoutes} from './routes';
import {HomeComponent} from './pages/home/home.component';
import {MaterialItemsModule} from "./MaterialItemsModule";
import { MenuComponent } from './components/menu/menu.component';
import {AuthService} from "./services/auth.service";
import {AdsService} from "./services/ads.service";
import { LoginComponent } from './pages/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ErrorComponent } from './pages/error/error.component';
import {HttpModule} from "@angular/http";
import { RegisterComponent } from './pages/register/register.component';
import { NewAdComponent } from './pages/ad/new-ad/new-ad.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ReportComponent } from './pages/report/report.component';
import { ContactComponent } from './pages/contact/contact.component';
import {ReportService} from "./services/reports.service";
import { MyAdsComponent } from './pages/ad/my-ads/my-ads.component';
import { EditAdComponent } from './pages/ad/edit-ad/edit-ad.component';
import { AdsComponent } from './pages/admin/ads/ads.component';
import { ChangeStatusComponent } from './pages/admin/change-status/change-status.component';
import { ViewAdComponent } from './pages/admin/view-ad/view-ad.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    LoginComponent,
    ErrorComponent,
    RegisterComponent,
    NewAdComponent,
    ProfileComponent,
    ReportComponent,
    ContactComponent,
    MyAdsComponent,
    EditAdComponent,
    AdsComponent,
    ChangeStatusComponent,
    ViewAdComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    MaterialItemsModule,
    HttpModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    ReportComponent,
    ContactComponent,
    EditAdComponent,
    ChangeStatusComponent,
    ViewAdComponent
  ],
  providers: [
    AuthService,
    AdsService,
    ReportService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
