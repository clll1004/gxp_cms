import { Component, Input, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Component({
    selector: 'preview-thumbnail',
    templateUrl: './preview-thumbnail.component.html'
})
export class PreviewThumbnailComponent implements OnInit {
    @Input() originFileInfo:object;
    public pvImg:any;

    constructor(private http: Http) { }

    ngOnInit() {
        this.loadThumbnail();
    }

    changeStatusRestart() {
        let newItemArray:any[] = [];
        let itemObject:any = {'fo_seq': this.originFileInfo['fo_seq']};
        newItemArray.push(itemObject);

        let headers:Headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

        return this.http.put('http://183.110.11.49/cms/contents', newItemArray, { headers: headers })
          .toPromise()
          .then(() => {location.reload();})
          .catch((error:any) => {
              console.log(error);
          });
    }
    changeStatusDelete() {
        console.log(this.originFileInfo);
    }

    loadThumbnail() {
        this.pvImg = document.getElementById('pvThumbnail');
        if(this.originFileInfo['fo_thumb_path']) {
            this.pvImg.src = 'http://' + this.originFileInfo['fo_thumb_path'];
        } else {
            this.pvImg.src = 'http://183.110.11.128/src/ci_gomc.jpg';
        }

    }
}
