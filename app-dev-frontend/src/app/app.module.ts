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

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    LoginComponent,
    ErrorComponent,
    RegisterComponent
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
  providers: [
    AuthService,
    AdsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
