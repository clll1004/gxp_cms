import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'preview-status',
    templateUrl: './preview-status.component.html'
})
export class PreviewStatusComponent implements OnInit {
    @Input() transcodingStatus: object;
    public transcodingItemInfo: any[] = [];

    constructor(private http: Http) { }

    ngOnInit() { }

    /*다이얼로그*/
    display: boolean = false;
    showDialog(item:any) {
        this.display = true;

        this.http.get('http://183.110.11.49/cms/contents/preview/' + item.ft_seq)
          .toPromise()
          .then((cont) => {
            this.transcodingItemInfo = JSON.parse(cont['_body']);
              console.log(this.transcodingItemInfo);
          });
    }
}
