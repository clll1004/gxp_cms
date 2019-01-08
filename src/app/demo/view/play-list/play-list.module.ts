/**
 * Created by GRE511 on 2019-01-08.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';

import { PlayListComponent } from './components/play-list.component';

import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@NgModule({
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    TableModule,
  ],
  exports: [PlayListComponent],
  declarations: [
    PlayListComponent,
  ]})

export class PlayListModule {
  constructor() { }
}
