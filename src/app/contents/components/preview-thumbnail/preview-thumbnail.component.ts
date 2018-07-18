import { Component, Input } from '@angular/core';

@Component({
    selector: 'preview-thumbnail',
    templateUrl: './preview-thumbnail.component.html'
})
export class PreviewThumbnailComponent {
    @Input() originFileInfo:object;

    constructor() { }

    changeStatusRestart() {
        console.log(this.originFileInfo);
    }
    changeStatusDelete() {
        console.log(this.originFileInfo);
    }
}
