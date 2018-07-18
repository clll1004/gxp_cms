import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'preview-fInfo',
    templateUrl: './preview-fInfo.component.html'
})
export class PreviewFInfoComponent implements OnInit {
    @Input() originFileInfo:object;

    constructor() { }

    ngOnInit() { }
}
