/**
 * Created by GRE511 on 2018-10-24.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './components/home.component';

import { CmsApis } from '../services/apis/apis';
import { DashboardService } from '../services/apis/cms/dashboard/dashboard.service';
import { CookieService } from '../services/library/cookie/cookie.service';

import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';
import { BlockUIModule } from 'primeng/blockui';

@NgModule({
  imports: [
    RouterModule,
    PanelModule,
    ChartModule,
    BlockUIModule,
  ],
  exports: [HomeComponent],
  declarations: [HomeComponent],
  providers: [CmsApis, DashboardService, CookieService],
})

export class HomeModule { }

