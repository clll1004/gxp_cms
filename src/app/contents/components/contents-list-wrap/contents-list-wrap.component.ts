import { Component, OnInit, OnChanges } from '@angular/core';
import { ContentListService } from "./contents-list-wrap.service";

@Component({
    selector: 'contents-list-wrap',
    templateUrl: './contents-list-wrap.component.html',
    styleUrls: ['../../contents.component.css'],
    providers: [ ContentListService ]
})

export class ContentsListWrapComponent implements OnInit {
    selectedCars3: any[];
    contentslists: any[];
    cols: any[];

    constructor(private service: ContentListService) {  }

    ngOnInit() {
        this.service.getContent().subscribe((cont) => {
            console.log(cont);
            // this.contentslists = JSON.parse(cont._body);

        });
    }

    onRowSelect() {
        console.log(this);
    }
}

