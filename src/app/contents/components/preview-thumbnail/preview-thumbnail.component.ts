import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'preview-thumbnail',
  templateUrl: './preview-thumbnail.component.html'})

export class PreviewThumbnailComponent implements OnInit {
  @Input() originFileInfo:object;
  public pvImg:any;
  public thumbPath:string = '';
  public thumbPathArray:any[] = [];

  constructor() { }

  ngOnInit() {
    this.loadThumbnail();
  }

  loadThumbnail() {
    this.pvImg = document.getElementById('pvThumbnail');
    this.thumbPath = this.originFileInfo['fo_thumb_path'];

    this.thumbPathArray = this.thumbPath.split('/');
  }
}
