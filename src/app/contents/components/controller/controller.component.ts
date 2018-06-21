import { Component, Input } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'contents-with-tools',
    templateUrl: './controller.component.html',
    styleUrls: ['../../contents.component.css']
})

export class ControllerComponent {
    @Input() selectRows: any[];

    constructor(private http: Http) { }

    deleteRows() {
        console.log(this.selectRows);
        // return this.http.delete(url + "/?" + key + "=" + val);
    }
}
