/**
 * Created by GRE511 on 2019-01-10.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'live-chat',
  templateUrl: './live-chat.component.html'})

export class LiveChatComponent implements OnInit {
  public params:Params;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.params = params;
    });
  }
}
