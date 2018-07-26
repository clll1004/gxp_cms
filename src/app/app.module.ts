import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
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
import { DataTableModule } from "primeng/primeng";
import { FileUploadModule } from 'primeng/fileupload';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { AppComponent } from './app.component';
import { HttpModule } from "@angular/http";
import { DialogModule } from "primeng/primeng";
import { PanelModule } from "primeng/primeng";
import { TreeModule } from 'primeng/tree';

import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { ContentsComponent } from "./contents/contents.component";
import { FileUploadComponent } from "./fileUpload/fileUpload.component";
import { TranscodingComponent } from "./transcoding/transcoding.component";
import { SettingsComponent } from "./settings/settings.component";
import { FooterComponent } from "./footer/footer.component";
import { LoginComponent } from "./login/login.component";
import { PathComponent } from "./path/path.component";

/*HOME*/
import { HomeDataComponent } from "./home/components/home-data/home-data.component";
import { HomeDataPlayerComponent } from "./home/components/home-data-player/home-data-player.component";
/*CONTENTS*/
import { PreviewThumbnailComponent } from "./contents/components/preview-thumbnail/preview-thumbnail.component";
import { PreviewStatusComponent } from "./contents/components/preview-status/preview-status.component";
import { PreviewFInfoComponent } from "./contents/components/preview-fInfo/preview-fInfo.component";
/*FILE UPLOAD*/
import { UpStdComponent } from "./fileUpload/components/up-std/up-std.component";
import { FileUploadEdtComponent } from "./fileUpload/components/fileUpload-edt/fileUpload-edt.component";
import { EdtPreviewWrapComponent } from "./fileUpload/components/fileUpload-edt/components/edt-preview-wrap/edt-preview-wrap.component";
import { LogoWrapComponent } from "./fileUpload/components/fileUpload-edt/components/logo-wrap/logo-wrap.component";
import { WtmkWrapComponent } from "./fileUpload/components/fileUpload-edt/components/wtmk-wrap/wtmk-wrap.component";
import { EventWrapComponent } from "./fileUpload/components/fileUpload-edt/components/event-wrap/event-wrap.component";
import { EventComponent } from "./fileUpload/components/fileUpload-edt/components/event/event.component";
import { SelectSectionComponent } from "./fileUpload/components/fileUpload-edt/components/select-section/select-section.component";
import { SelectSectionWrapComponent } from "./fileUpload/components/fileUpload-edt/components/select-section-wrap/select-section-wrap.component";
/*transcoding*/
import { TcListContainerComponent} from "./transcoding/tcListContainer/tcListContainer.component";
/*SETTINGS*/
import { AddGroupComponent } from "./settings/components/add-group/add-group.component";
import { GroupMngComponent } from "./settings/components/group-mng/group-mng.component";
import { UserModifyComponent } from "./settings/components/user-modify/user-modify.component";
import { ChangePswdComponent } from "./settings/components/change-pswd/change-pswd.component";

import { AppRoutingModule } from "./app-routing.module";

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
        PanelModule,
        TreeModule,
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
        LoginComponent,
        PathComponent,

        HomeDataComponent,
        HomeDataPlayerComponent,

        PreviewThumbnailComponent,
        PreviewStatusComponent,
        PreviewFInfoComponent,

        UpStdComponent,
        FileUploadEdtComponent,
        EdtPreviewWrapComponent,
        LogoWrapComponent,
        WtmkWrapComponent,
        EventWrapComponent,
        EventComponent,
        SelectSectionWrapComponent,
        SelectSectionComponent,

        TcListContainerComponent,

        AddGroupComponent,
        GroupMngComponent,
        UserModifyComponent,
        ChangePswdComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {

}
