/**
 * Created by GRE511 on 2019-01-16.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'transmit-history',
  templateUrl: './transmit-history.component.html'})

export class TransmitHistoryComponent implements OnInit {
  public params:Params;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.params = params;
    });
  }
}
