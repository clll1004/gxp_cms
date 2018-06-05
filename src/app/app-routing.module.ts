import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { ContentsComponent } from "./contents/contents.component";
import { FileUploadComponent } from "./fileUpload/fileUpload.component";
import { TranscodingComponent } from "./transcoding/transcoding.component";
import { SettingsComponent } from "./settings/settings.component";


const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'header', component: HeaderComponent },
    { path: 'home', component: HomeComponent },
    { path: 'fileUpload', component: FileUploadComponent },
    { path: 'fileUpload/:id', component: FileUploadComponent },
    { path: 'contents', component: ContentsComponent },
    { path: 'transcoding', component: TranscodingComponent },
    { path: 'transcoding/:id', component: TranscodingComponent },
    { path: 'settings', component: SettingsComponent},
    { path: 'settings/:id', component: SettingsComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}

