import { Component, OnInit, OnChanges } from '@angular/core';
import { ContentListService } from "./contents-list-wrap.service";

@Component({
    selector: 'contents-list-wrap',
    templateUrl: './contents-list-wrap.component.html',
    styleUrls: ['../../contents.component.css'],
    providers: [ ContentListService ]
})

export class ContentsListWrapComponent implements OnInit {
    selectContents: any[];
    contentsLists: any[];

    constructor(private service: ContentListService) {  }

    ngOnInit() {
        this.service.getContent().subscribe((cont) => {
            // console.log(JSON.parse(cont._body).list);
            this.contentsLists = JSON.parse(cont._body).list;

        });
    }

    onRowSelect() {
        console.log(this);
    }
}

