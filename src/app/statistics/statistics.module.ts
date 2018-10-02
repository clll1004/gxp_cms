/**
 * Created by GRE511 on 2018-08-22.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { DatePickerModule } from '../common/date-picker/date-picker.module';

import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule, CalendarModule } from 'primeng/primeng';
import { CheckboxModule } from 'primeng/checkbox';

import { StatisticsComponent } from './statistics.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsageAnalysisComponent } from './components/usage-analysis/usage-analysis.component';
import { ByTrafficComponent } from './components/usage-analysis/components/by-traffic/by-traffic.component';
import { ByUsageStorageComponent } from './components/usage-analysis/components/by-usage-storage/by-usage-storage.component';
import { ByGxpComponent } from './components/usage-analysis/components/by-gxp/by-gxp.component';
import { ByTransCodingComponent } from './components/usage-analysis/components/by-transCoding/by-transCoding.component';
import { PlayStatisticsComponent } from './components/play-statistics/play-statistics.component';
import { ByDateComponent } from './components/play-statistics/components/by-date/by-date.component';
import { ByTimeComponent } from './components/play-statistics/components/by-time/by-time.component';
import { ByPlaySectionComponent } from './components/play-statistics/components/by-play-section/by-play-section.component';
import { ByPlayTimeComponent } from './components/play-statistics/components/by-play-time/by-play-time.component';
import { ByContentsComponent } from './components/play-statistics/components/by-contents/by-contents.component';
import { ByCategoryComponent } from './components/play-statistics/components/by-category/by-category.component';
import { VisitorStatisticsComponent } from './components/visitor-statistics/visitor-statistics.component';
import { FolderPickerComponent } from './components/folder-picker/folder-picker.component';
import { ChartGroupComponent } from './components/play-statistics/components/chart-group/chart-group.component';

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'play-statistics', component: PlayStatisticsComponent },
];

@NgModule({
  imports: [
    ChartModule,
    DatePickerModule,
    RouterModule.forChild(appRoutes),
    BrowserModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    TableModule,
    DialogModule,
    CalendarModule,
    CheckboxModule,
  ],
  exports: [StatisticsComponent],
  declarations: [
    StatisticsComponent,
    DashboardComponent,
    UsageAnalysisComponent,
    ByTrafficComponent,
    ByUsageStorageComponent,
    ByGxpComponent,
    ByTransCodingComponent,
    PlayStatisticsComponent,
    ByDateComponent,
    ByTimeComponent,
    ByPlaySectionComponent,
    ByPlayTimeComponent,
    ByContentsComponent,
    ByCategoryComponent,
    VisitorStatisticsComponent,
    FolderPickerComponent,
    ChartGroupComponent,
  ]})

export class StatisticsModule {
  constructor() { }
}
