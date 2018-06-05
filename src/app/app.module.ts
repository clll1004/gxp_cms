import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { SliderModule } from "primeng/slider";
import { TabViewModule } from 'primeng/tabview';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressBarModule } from 'primeng/progressbar';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { TreeModule } from 'primeng/tree';
import { AppComponent } from './app.component';

import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { ContentsComponent } from "./contents/contents.component";
import { FileUploadComponent } from "./fileUpload/fileUpload.component";
import { TranscodingComponent } from "./transcoding/transcoding.component";
import { SettingsComponent } from "./settings/settings.component";
import { FooterComponent } from "./footer/footer.component";

/*HOME*/
import { HomeDataComponent } from "./home/components/home-data/home-data.component";
import { HomeDataPlayerComponent } from "./home/components/home-data-player/home-data-player.component";
/*CONTENTS*/
import { ContentsWrapComponent } from "./contents/components/contents-wrap/contents-wrap.component";
import { ContentsControllerComponent } from "./contents/components/contents-controller/contents-controller.component";
import { ContentsListWrapComponent } from "./contents/components/contents-list-wrap/contents-list-wrap.component";
import { ContentsListComponent } from "./contents/components/contents-list/contents-list.component";
import { ContentsPreviewWrapComponent } from "./contents/components/contents-preview-wrap/contents-preview-wrap.component";
import { ContentsPreviewThumbnailComponent } from "./contents/components/contents-preview-thumbnail/contents-preview-thumbnail.component";
import { ContentsPreviewStatusComponent } from "./contents/components/contents-preview-status/contents-preview-status.component";
import { ContentsPreviewFInfoComponent } from "./contents/components/contents-preview-fInfo/contents-preview-fInfo.component";
/*FILE UPLOAD*/
import { FileUploadStdComponent } from "./fileUpload/components/fileUpload-std/fileUpload-std.component";
import { FileUploadEdtComponent } from "./fileUpload/components/fileUpload-edt/fileUpload-edt.component";
import { FileUploadEdtPreviewWrapComponent } from "./fileUpload/components/fileUpload-edt/components/fileUpload-edt-preview-wrap/fileUpload-edt-preview-wrap.component";
import { FileUploadEdtLogoWrapComponent } from "./fileUpload/components/fileUpload-edt/components/fileUpload-edt-logo-wrap/fileUpload-edt-logo-wrap.component";
import { FileUploadEdtWtmkWrapComponent } from "./fileUpload/components/fileUpload-edt/components/fileUpload-edt-wtmk-wrap/fileUpload-edt-wtmk-wrap.component";
import { FileUploadEdtEventWrapComponent } from "./fileUpload/components/fileUpload-edt/components/fileUpload-edt-event-wrap/fileUpload-edt-event-wrap.component";
import { FileUploadEdtEventComponent } from "./fileUpload/components/fileUpload-edt/components/fileUpload-edt-event/fileUpload-edt-event.component";
import { FileUploadEdtSectionComponent } from "./fileUpload/components/fileUpload-edt/components/fileUpload-edt-section/fileUpload-edt-section.component";
import { FileUploadEdtSectionWrapComponent } from "./fileUpload/components/fileUpload-edt/components/fileUpload-edt-section-wrap/fileUpload-edt-section-wrap.component";
/*transcoding*/
import { TranscodingWrapComponent } from "./transcoding/components/transcoding-wrap/transcoding-wrap.component";
/*SETTINGS*/
import { SettingsAddGroupComponent } from "./settings/components/settings-add-group/settings-add-group.component";
import { SettingsGroupMngComponent } from "./settings/components/settings-group-mng/settings-group-mng.component";
import { SettingsUserModifyComponent } from "./settings/components/settings-user-modify/settings-user-modify.component";
import { SettingsChangePswdComponent } from "./settings/components/settings-change-pswd/settings-change-pswd.component";

import { AppRoutingModule } from "./app-routing.module";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
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
        FileUploadModule,
        RadioButtonModule,
        AccordionModule,
        CheckboxModule,
        TreeModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        ContentsComponent,
        FileUploadComponent,
        SettingsComponent,
        TranscodingComponent,
        FooterComponent,

        HomeDataComponent,
        HomeDataPlayerComponent,

        ContentsWrapComponent,
        ContentsControllerComponent,
        ContentsListWrapComponent,
        ContentsListComponent,
        ContentsPreviewWrapComponent,
        ContentsPreviewThumbnailComponent,
        ContentsPreviewStatusComponent,
        ContentsPreviewFInfoComponent,

        FileUploadStdComponent,
        FileUploadEdtComponent,
        FileUploadEdtPreviewWrapComponent,
        FileUploadEdtLogoWrapComponent,
        FileUploadEdtWtmkWrapComponent,
        FileUploadEdtEventWrapComponent,
        FileUploadEdtEventComponent,
        FileUploadEdtSectionWrapComponent,
        FileUploadEdtSectionComponent,

        TranscodingWrapComponent,

        SettingsAddGroupComponent,
        SettingsGroupMngComponent,
        SettingsUserModifyComponent,
        SettingsChangePswdComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {

}
