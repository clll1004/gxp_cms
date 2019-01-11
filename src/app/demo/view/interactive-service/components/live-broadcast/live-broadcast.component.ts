/**
 * Created by GRE511 on 2019-01-11.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'live-broadcast',
  templateUrl: './live-broadcast.component.html'})

export class LiveBroadcastComponent implements OnInit {
  public params:Params;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.params = params;
    });
  }
}
