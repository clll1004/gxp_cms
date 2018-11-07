/**
 * Created by GRE511 on 2018-10-24.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopupModule } from '../common/popup/popup.module';

import { TranscodingComponent } from './components/transcoding.component';
import { TcListContainerComponent } from './components/tcListContainer/tcListContainer.component';

import { CmsApis } from '../services/apis/apis';
import { CookieService } from '../services/library/cookie/cookie.service';
import { TranscodingService } from '../services/apis/cms/transcoding/transcoding.service';

import { PanelModule } from 'primeng/panel';
import { BlockUIModule } from 'primeng/blockui';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    PanelModule,
    BlockUIModule,
    TableModule,
    ConfirmDialogModule,
    DropdownModule,
    InputTextModule,
    ProgressBarModule,
    PopupModule,
  ],
  exports: [TranscodingComponent],
  declarations: [
    TranscodingComponent,
    TcListContainerComponent,
  ],
  providers: [
    CmsApis,
    CookieService,
    TranscodingService,
  ],
})

export class TranscodingModule { }
