import {Component, Input} from '@angular/core';

@Component({
    selector: 'transcoding-wrap',
    templateUrl: './transcoding-wrap.component.html',
    styleUrls: ['../../transcoding.component.css', './transcoding-wrap.component.css']
})
export class TranscodingWrapComponent {
    @Input() params:object;

    constructor() {
        console.log('!!');
        console.log(this.params);
    }
}
