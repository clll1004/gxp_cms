/**
 * Created by GRE511 on 2019-01-25.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'encoding-preset',
  styleUrls: ['./encoding-preset.component.css'],
  templateUrl: './encoding-preset.component.html'})

export class EncodingPresetComponent implements OnInit {
  public params:Params;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.params = params;
    });
  }
}
