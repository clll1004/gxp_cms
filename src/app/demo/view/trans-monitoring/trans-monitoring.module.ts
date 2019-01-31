/**
 * Created by GRE511 on 2019-01-09.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';

import { TransMonitoringComponent } from './components/trans-monitoring.component';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { ProgressBarModule } from 'primeng/progressbar';
import { TabViewModule } from 'primeng/tabview';
import { AccordionModule } from 'primeng/accordion';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SliderModule } from 'primeng/slider';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    ButtonModule,
    TableModule,
    DialogModule,
    PanelModule,
    ProgressBarModule,
    TabViewModule,
    AccordionModule,
    RadioButtonModule,
    SliderModule,
    DropdownModule,
  ],
  exports: [TransMonitoringComponent],
  declarations: [
    TransMonitoringComponent,
  ]})

export class TransMonitoringModule {
  constructor() { }
}
