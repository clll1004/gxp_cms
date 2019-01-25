/**
 * Created by GRE511 on 2019-01-23.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html'})

export class SettingsComponent implements OnInit {
  public params:Params;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.params = params;
    });
  }
}
