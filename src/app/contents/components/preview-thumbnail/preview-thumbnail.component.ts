import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'preview-thumbnail',
    templateUrl: './preview-thumbnail.component.html'
})
export class PreviewThumbnailComponent implements OnInit {
    @Input() originFileInfo:object;
    public pvImg:any;
    public thumbpath:string = '';
    public thumbpathArray:any[] = [];

    constructor() { }

    ngOnInit() {
        this.loadThumbnail();
        console.log('!');
    }
    loadThumbnail() {
        this.pvImg = document.getElementById('pvThumbnail');
        this.thumbpath = this.originFileInfo['fo_thumb_path'];

        this.thumbpathArray = this.thumbpath.split('/');
        console.log(this.thumbpathArray);

        // if(this.originFileInfo['fo_thumb_path'] !== '0') {
        //     this.pvImg.src = 'http://' + this.originFileInfo['fo_thumb_path'];
        //     console.log(this.pvImg.src);
        // } else {
        //     this.pvImg.src = 'http://str.gomgxp.com/src/ci_gomc.jpg';
        //     console.log(this.pvImg.src);
        // }
    }
}
