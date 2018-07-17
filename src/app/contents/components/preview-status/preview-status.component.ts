import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'preview-status',
    templateUrl: './preview-status.component.html',
    styleUrls: ['./preview-status.component.css']
})
export class PreviewStatusComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

    display: boolean = false;
    showDialog() {
        this.display = true;
    }


}
