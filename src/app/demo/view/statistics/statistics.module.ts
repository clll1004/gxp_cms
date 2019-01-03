/**
 * Created by GRE511 on 2019-01-03.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StatisticsComponent } from './components/statistics.component';
import { PlayStatisticsComponent } from './components/playStatistics/playStatistics.component';

@NgModule({
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [StatisticsComponent],
  declarations: [
    StatisticsComponent,
    PlayStatisticsComponent,
  ]})

export class StatisticsModule {
  constructor() { }
}