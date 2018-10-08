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
import { StatisticsModule } from './statistics/statistics.module';
import { ChartModule } from 'primeng/chart';
import { BlockUIModule } from 'primeng/blockui';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ContentsComponent } from './contents/contents.component';
import { TranscodingComponent } from './transcoding/transcoding.component';
import { SettingsComponent } from './settings/settings.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';

import { LoginService } from './login/login.service';

/*CONTENTS*/
import { PreviewThumbnailComponent } from './contents/components/preview-thumbnail/preview-thumbnail.component';
import { PreviewStatusComponent } from './contents/components/preview-status/preview-status.component';
import { PreviewFInfoComponent } from './contents/components/preview-fInfo/preview-fInfo.component';
/*transCoding*/
import { TcListContainerComponent } from './transcoding/tcListContainer/tcListContainer.component';
/*SETTINGS*/
import { AddGroupComponent } from './settings/components/add-group/add-group.component';
import { GroupMngComponent } from './settings/components/group-mng/group-mng.component';
import { UserModifyComponent } from './settings/components/user-modify/user-modify.component';
import { ChangePswdComponent } from './settings/components/change-pswd/change-pswd.component';
import { PlayerPresetComponent } from './settings/components/preset-setting/components/player-preset/player-preset.component';

import { AppRoutingModule } from './app-routing.module';

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
    StatisticsModule,
    ChartModule,
    BlockUIModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ContentsComponent,
    SettingsComponent,
    TranscodingComponent,
    FooterComponent,
    LoginComponent,

    PreviewThumbnailComponent,
    PreviewStatusComponent,
    PreviewFInfoComponent,

    TcListContainerComponent,

    AddGroupComponent,
    GroupMngComponent,
    UserModifyComponent,
    ChangePswdComponent,
    PlayerPresetComponent],
  providers: [LoginService],
  bootstrap: [AppComponent]})

export class AppModule { }
