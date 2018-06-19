import { Component, OnInit } from '@angular/core';
import { ContentListService } from "./list-wrap.service";

@Component({
    selector: 'list-wrap',
    templateUrl: './list-wrap.component.html',
    styleUrls: ['../../contents.component.css'],
    providers: [ ContentListService ]
})

export class ListWrapComponent implements OnInit {
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
        //console.log(this);
    }


}

