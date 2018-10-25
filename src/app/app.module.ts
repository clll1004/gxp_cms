import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { TabViewModule } from 'primeng/tabview';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressBarModule } from 'primeng/progressbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { DataTableModule, DialogModule, ConfirmDialogModule, PanelModule } from 'primeng/primeng';
import { FileUploadModule } from 'primeng/fileupload';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { TreeModule } from 'primeng/tree';
import { ChartModule } from 'primeng/chart';
import { BlockUIModule } from 'primeng/blockui';

import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';
import { HomeModule } from './home/home.module';
import { TranscodingModule } from './transcoding/transcoding.module';
import { StatisticsModule } from './statistics/statistics.module';
import { SettingsModule } from './settings/settings.module';

import { ContentsComponent } from './contents/contents.component';
import { LoginComponent } from './login/login.component';

import { LoginService } from './login/login.service';

/*CONTENTS*/
import { PreviewThumbnailComponent } from './contents/components/preview-thumbnail/preview-thumbnail.component';
import { PreviewStatusComponent } from './contents/components/preview-status/preview-status.component';
import { PreviewFInfoComponent } from './contents/components/preview-fInfo/preview-fInfo.component';

import { AppRoutingModule } from './app-routing.module';
import { CookieService } from './services/library/cookie/cookie.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    SliderModule,
    TabViewModule,
    PaginatorModule,
    ProgressBarModule,
    DropdownModule,
    BrowserAnimationsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    InputTextareaModule,
    TableModule,
    DataTableModule,
    FileUploadModule,
    RadioButtonModule,
    AccordionModule,
    CheckboxModule,
    AppRoutingModule,
    HttpModule,
    DialogModule,
    ConfirmDialogModule,
    PanelModule,
    TreeModule,
    ChartModule,
    BlockUIModule,
    HeaderModule,
    FooterModule,
    HomeModule,
    TranscodingModule,
    StatisticsModule,
    SettingsModule,
  ],
  declarations: [
    AppComponent,
    ContentsComponent,
    LoginComponent,

    PreviewThumbnailComponent,
    PreviewStatusComponent,
    PreviewFInfoComponent],
  providers: [LoginService, CookieService],
  bootstrap: [AppComponent]})

export class AppModule { }
