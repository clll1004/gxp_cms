import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

@Injectable()
export class ContentListService {
    public url:string = 'http://183.110.11.49/adm/customer/list?page=1&row=10';

    constructor(private http: Http) {  }

    getContent(): Observable<any> {
        // return this.http.get('src/app/contents/components/list-wrap/list-wrap.json');
        return this.http.get(this.url);
    }
}

