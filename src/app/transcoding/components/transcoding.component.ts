import { Component } from '@angular/core';

@Component({
  selector: 'transcoding',
  templateUrl: './transcoding.component.html',
  styleUrls: ['./transcoding.component.css']})

export class TranscodingComponent {
  constructor() { }

  ngOnInit() {}

  refresh() {
    window.location.reload();
  }
}
