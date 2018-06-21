import { Component, Input } from '@angular/core';
import { Http } from "@angular/http";
import { ListService } from "../../../services/list/list.service";

@Component({
    selector: 'contents-with-tools',
    templateUrl: './controller.component.html',
    styleUrls: ['../../contents.component.css'],
    providers: []
})

export class ControllerComponent {
    @Input() selectRows: any[];

    constructor(private http: Http, private listService: ListService) {
      this.listService.items.subscribe((items:any[]) => {
          this.selectRows = items;
      });
    }

    deleteRows() {
        console.log(this.selectRows);
        // return this.http.delete(url + "/?" + key + "=" + val);
    }
}
