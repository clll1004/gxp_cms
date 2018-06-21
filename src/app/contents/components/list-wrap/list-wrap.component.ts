import { Component, Injectable, OnInit } from '@angular/core';
import { ContentListService } from "./list-wrap.service";
import { Input } from "@angular/core";


@Component({
    selector: 'list-wrap',
    templateUrl: './list-wrap.component.html',
    styleUrls: ['../../contents.component.css'],
    providers: [ ContentListService ]
})

@Injectable()
export class ListWrapComponent implements OnInit {
    public selectContents: any[];
    public contentsLists: any[];
    @Input() selectRows: any[];

    constructor(private contentListService: ContentListService) {  }

    ngOnInit() {
        this.contentListService.getContent().subscribe((cont) => {
            this.contentsLists = JSON.parse(cont._body).list;
        });
    }

    onRowSelect() {
      this.selectRows.length = 0;
      this.selectContents.forEach((row) => {
          this.selectRows.push(row);
      });
    }
}

