/**
 * Created by GRE511 on 2019-01-25.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';

import { DeveloperToolComponent } from './components/developer-tool.component';
import { EncodingToolComponent } from './components/encoding-tool/encoding-tool.component';
import { PlayerToolComponent } from './components/player-tool/player-tool.component';
import { AnalysisToolComponent } from './components/analysis-tool/analysis-tool.component';

import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    TabMenuModule,
    ButtonModule,
  ],
  exports: [DeveloperToolComponent],
  declarations: [
    DeveloperToolComponent,
    EncodingToolComponent,
    PlayerToolComponent,
    AnalysisToolComponent,
  ]})

export class DeveloperToolModule {
  constructor() { }
}
