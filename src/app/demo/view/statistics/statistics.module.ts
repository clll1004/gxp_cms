/**
 * Created by GRE511 on 2019-01-03.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';

import { StatisticsComponent } from './components/statistics.component';
import { PlayStatisticsComponent } from './components/playStatistics/playStatistics.component';
import { UsageAnalysisComponent } from './components/usageAnalysis/usageAnalysis.component';
import { VisitorStatisticsComponent } from './components/visitorStatistics/visitorStatistics.component';
import { ReporterComponent } from './components/reporter/reporter.component';

import { ByDateComponent } from './components/playStatistics/components/byDate/byDate.component';
import { ByTimeComponent } from './components/playStatistics/components/byTime/byTime.component';
import { ByPlaySectionComponent } from './components/playStatistics/components/byPlaySection/byPlaySection.component';
import { ByPlayTimeComponent } from './components/playStatistics/components/byPlayTime/byPlayTime.component';
import { ByContentsComponent } from './components/playStatistics/components/byContents/byContents.component';
import { ByPlayListComponent } from './components/playStatistics/components/byPlayList/byPlayList.component';
import { ByAdComponent } from './components/playStatistics/components/byAd/byAd.component';

import { ByGXPComponent } from './components/usageAnalysis/components/byGXP/byGXP.component';
import { ByStorageComponent } from './components/usageAnalysis/components/byStorage/byStorage.component';
import { ByEncodingComponent } from './components/usageAnalysis/components/byEncoding/byEncoding.component';

import { ExportReportComponent } from './components/reporter/components/exportReport/exportReport.component';
import { AutoReportComponent } from './components/reporter/components/autoReport/autoReport.component';

import { TabMenuModule } from 'primeng/tabmenu';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    TabMenuModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    ChartModule,
    CheckboxModule,
  ],
  exports: [StatisticsComponent],
  declarations: [
    StatisticsComponent,
    PlayStatisticsComponent,
    UsageAnalysisComponent,
    VisitorStatisticsComponent,
    ReporterComponent,
    ByDateComponent,
    ByTimeComponent,
    ByPlaySectionComponent,
    ByPlayTimeComponent,
    ByContentsComponent,
    ByPlayListComponent,
    ByAdComponent,
    ByGXPComponent,
    ByStorageComponent,
    ByEncodingComponent,
    ExportReportComponent,
    AutoReportComponent,
  ]})

export class StatisticsModule {
  constructor() { }
}