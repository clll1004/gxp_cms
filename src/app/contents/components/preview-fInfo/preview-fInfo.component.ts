import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'preview-fInfo',
    templateUrl: './preview-fInfo.component.html'
})
export class PreviewFInfoComponent implements OnInit {
    @Input() originFileInfo:object;
    @Input() groupName:string;
    @Input() folderName:string;

    constructor() {}

    ngOnInit() { }
}
