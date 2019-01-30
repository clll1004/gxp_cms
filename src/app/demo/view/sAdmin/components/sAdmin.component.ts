/**
 * Created by GRE511 on 2019-01-30.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'sAdmin',
  templateUrl: './sAdmin.component.html'})

export class SAdminComponent implements OnInit {
  public params:Params;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.params = params;
    });
  }
}

