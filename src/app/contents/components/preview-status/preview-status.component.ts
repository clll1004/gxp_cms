import { Component } from '@angular/core';

@Component({
    selector: 'preview-status',
    templateUrl: './preview-status.component.html',
    styleUrls: ['./preview-status.component.css']
})
export class PreviewStatusComponent {
    constructor() {
      // console.log('!!');
    }


    display: boolean = false;
    showDialog() {
        this.display = true;
    }

    test () {

    }

}
