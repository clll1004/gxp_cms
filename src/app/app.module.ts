import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { SliderModule } from "primeng/slider";
import { TabViewModule } from 'primeng/tabview';
import { AppComponent } from './app.component';

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


import { AppRoutingModule } from "./app-routing.module";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        SliderModule,
        TabViewModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        ContentsComponent,
        SettingsComponent,
        TranscordingComponent,
        FooterComponent,

        TransSub0Component,
        TransSub1Component,
        TransSub2Component,
        TransSub3Component,
        TransSub4Component
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {

}
