import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'preview-thumbnail',
    templateUrl: './preview-thumbnail.component.html'
})
export class PreviewThumbnailComponent implements OnInit {
    @Input() originFileInfo:object;
    public pvImg:any;

    constructor() { }

    ngOnInit() {
        this.loadThumbnail();
    }
    loadThumbnail() {
        this.pvImg = document.getElementById('pvThumbnail');
        if(this.originFileInfo['fo_thumb_path']) {
            this.pvImg.src = 'http://' + this.originFileInfo['fo_thumb_path'];
        } else {
            this.pvImg.src = 'http://183.110.11.128/src/ci_gomc.jpg';
        }
    }
}
