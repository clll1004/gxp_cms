import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';


@Injectable()
export class ContentListService {
    constructor(private http: Http) {
        let obj:any;

        this.getContent().subscribe((data) => {
            obj = data;
        }, error => {
            console.log(error);
        });
    }

    getContent(): Observable<any> {
        // return this.http.get('src/app/contents/components/contents-list-wrap/contents-list-wrap.json');
        return this.http.get('http://183.110.11.49/adm/customer/list', { withCredentials: true });
    }
}

