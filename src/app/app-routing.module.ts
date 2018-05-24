import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { ContentsComponent } from "./contents/contents.component";
import { TranscordingComponent } from "./transcording/transcording.component";
import { SettingsComponent } from "./settings/settings.component";
import { FooterComponent } from "./footer/footer.component";

/*CONTENTS*/
/*TRANSCORDING*/
import { TransSub0Component } from "./transSub0/transSub0.component";
import { TransSub1Component } from "./transSub1/transSub1.component";
import { TransSub2Component } from "./transSub2/transSub2.component";
import { TransSub3Component } from "./transSub3/transSub3.component";
import { TransSub4Component } from "./transSub4/transSub4.component";
/*SETTINGS*/

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'header', component: HeaderComponent },
    { path: 'home', component: HomeComponent },
    { path: 'contents', component: ContentsComponent },
    { path: 'transcording', component: TranscordingComponent },
    { path: 'settings', component: SettingsComponent},
    { path: 'footer', component: FooterComponent },


    { path: 'transSub0', component: TransSub0Component },
    { path: 'transSub1', component: TransSub1Component },
    { path: 'transSub2', component: TransSub2Component },
    { path: 'transSub3', component: TransSub3Component },
    { path: 'transSub4', component: TransSub4Component }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}

