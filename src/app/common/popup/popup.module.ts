/**
 * Created by GRE511 on 2018-11-05.
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DialogModule } from 'primeng/dialog';

import { PopupComponent } from './components/popup.component';

@NgModule({
  imports: [
    BrowserModule,
    DialogModule,
  ],
  exports: [PopupComponent],
  declarations: [PopupComponent],
})

export class PopupModule { }
