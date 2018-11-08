import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/components/login.component';
import { HeaderComponent } from './header/components/header.component';
import { HomeComponent } from './home/components/home.component';
import { ContentsComponent } from './contents/components/contents.component';
import { TranscodingComponent } from './transcoding/components/transcoding.component';
import { StatisticsComponent } from './statistics/components/statistics.component';
import { SettingsComponent } from './settings/components/settings.component';

const routes: Routes = [
    { path: '', redirectTo: 'contents', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'header', component: HeaderComponent },
    { path: 'home', component: HomeComponent },
    { path: 'contents', component: ContentsComponent },
    { path: 'transcoding', component: TranscodingComponent },
    { path: 'statistics', component: StatisticsComponent },
    { path: 'statistics/:id', component: StatisticsComponent },
    { path: 'statistics/:id/:sub-id', component: StatisticsComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'settings/:id', component: SettingsComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]})

export class AppRoutingModule {}

