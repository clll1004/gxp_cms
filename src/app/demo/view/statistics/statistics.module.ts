/**
 * Created by GRE511 on 2019-01-03.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { ByCategoryComponent } from './components/playStatistics/components/byCategory/byCategory.component';
import { ByAdComponent } from './components/playStatistics/components/byAd/byAd.component';

import { TabMenuModule } from 'primeng/tabmenu';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ChartModule } from 'primeng/chart';

@NgModule({
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    TabMenuModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    ChartModule,
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
    ByCategoryComponent,
    ByAdComponent,
  ]})

export class StatisticsModule {
  constructor() { }
}