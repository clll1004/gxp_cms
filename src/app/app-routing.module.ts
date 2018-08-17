import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ContentsComponent } from './contents/contents.component';
import { TranscodingComponent } from './transcoding/transcoding.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'header', component: HeaderComponent },
    { path: 'home', component: HomeComponent },
    { path: 'contents', component: ContentsComponent },
    { path: 'transcoding', component: TranscodingComponent },
    { path: 'transcoding/list/:id', component: TranscodingComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'settings/:id', component: SettingsComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]})

export class AppRoutingModule {}

