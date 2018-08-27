/**
 * Created by GRE511 on 2018-08-22.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DatePickerModule } from '../common/date-picker/components/date-picker.component';

import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ChartModule } from 'primeng/chart';

import { StatisticsComponent } from './statistics.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PlayStatisticsComponent } from './components/play-statistics/play-statistics.component';
import { ShowStatisticsComponent } from './components/show-statistics/show-statistics.component';
import { FolderPickerComponent } from './components/folder-picker/folder-picker.component';
import { ChartsComponent } from './components/show-statistics/components/charts/charts.component';

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'play-statistics', component: PlayStatisticsComponent },
];

@NgModule({
  imports: [
    ChartsModule,
    DatePickerModule,
    RouterModule.forChild(appRoutes),
    BrowserModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    ChartModule,
  ],
  exports: [StatisticsComponent],
  declarations: [
    ShowStatisticsComponent,
    StatisticsComponent,
    DashboardComponent,
    PlayStatisticsComponent,
    FolderPickerComponent,
    ChartsComponent,
  ]})

export class StatisticsModule {
  constructor() { }
}
