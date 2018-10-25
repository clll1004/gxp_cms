import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'preview-fInfo',
  templateUrl: './preview-fInfo.component.html',
  styleUrls: ['../contents.component.css']})

export class PreviewFInfoComponent implements OnInit {
  @Input() originFileInfo:any;
  @Input() folderPath: any;

  constructor() {}

  ngOnInit() { }
}
