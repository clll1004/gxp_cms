import { Component } from '@angular/core';

@Component({
    selector: 'contents-wrap',
    templateUrl: './contents-wrap.component.html',
    styleUrls: ['../../contents.component.css']
})
export class ContentsWrapComponent {
    selectRows:any[] = [];

    constructor() {  }

}
