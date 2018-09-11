/**
 * Created by GRE511 on 2018-09-11.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'visitor-statistics',
  templateUrl: './visitor-statistics.component.html',
  styleUrls: ['./visitor-statistics.component.css']})

export class VisitorStatisticsComponent implements OnInit {
  public params:Params;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.params = params;
    });
  }
}
