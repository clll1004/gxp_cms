/**
 * Created by GRE511 on 2018-10-25.
 */
import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContentsComponent } from './components/contents.component';
import { PreviewThumbnailComponent } from './components/preview-thumbnail/preview-thumbnail.component';
import { PreviewStatusComponent } from './components/preview-status/preview-status.component';
import { PreviewFInfoComponent } from './components/preview-fInfo/preview-fInfo.component';

import { FolderService } from '../services/apis/cms/folder/folder.service';
import { ContentsService } from '../services/apis/cms/contents/contents.service';
import { CmsApis } from '../services/apis/apis';

import { PanelModule } from 'primeng/panel';
import { BlockUIModule } from 'primeng/blockui';
import { TableModule } from 'primeng/table';
import { TreeModule } from 'primeng/tree';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    PanelModule,
    BlockUIModule,
    TableModule,
    TreeModule,
    ConfirmDialogModule,
    DialogModule,
    FileUploadModule,
  ],
  exports: [ContentsComponent],
  declarations: [
    ContentsComponent,
    PreviewThumbnailComponent,
    PreviewStatusComponent,
    PreviewFInfoComponent,
  ],
  providers: [
    FolderService,
    ContentsService,
    CmsApis,
  ],
})

export class ContentsModule { }
