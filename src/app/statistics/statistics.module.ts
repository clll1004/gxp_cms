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
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/primeng';

import { StatisticsComponent } from './statistics.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PlayStatisticsComponent } from './components/play-statistics/play-statistics.component';
import { ShowStatisticsComponent } from './components/show-statistics/show-statistics.component';
import { FolderPickerComponent } from './components/folder-picker/folder-picker.component';
import { ChartGroupComponent } from './components/show-statistics/components/chart-group/chart-group.component';
import { TableGroupComponent } from './components/show-statistics/components/table-group/table-group.component';

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
    ButtonModule,
    ChartModule,
    TableModule,
    DialogModule,
  ],
  exports: [StatisticsComponent],
  declarations: [
    ShowStatisticsComponent,
    StatisticsComponent,
    DashboardComponent,
    PlayStatisticsComponent,
    FolderPickerComponent,
    ChartGroupComponent,
    TableGroupComponent,
  ]})

export class StatisticsModule {
  constructor() { }
}
