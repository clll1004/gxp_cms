import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { LoginModule } from './login/login.module';
import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';
import { HomeModule } from './home/home.module';
import { ContentsModule } from './contents/contents.module';
import { TranscodingModule } from './transcoding/transcoding.module';
import { StatisticsModule } from './statistics/statistics.module';
import { SettingsModule } from './settings/settings.module';

import { AppComponent } from './app.component';

import { LoginService } from './services/apis/cms/login/login.service';
import { CookieService } from './services/library/cookie/cookie.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpModule,
    LoginModule,
    HeaderModule,
    FooterModule,
    HomeModule,
    ContentsModule,
    TranscodingModule,
    StatisticsModule,
    SettingsModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [LoginService, CookieService],
  bootstrap: [AppComponent]})

export class AppModule { }
