import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params} from "@angular/router";
import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { TreeNode } from "primeng/api";

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})

@Injectable()
export class SettingsComponent implements OnInit {

    public params:Params;

    files: TreeNode[];
    selectedFile: TreeNode;

    constructor(private activatedRoute: ActivatedRoute, private http: Http) {
        this.activatedRoute.params.subscribe( (params) => {
            this.params = params;
        });

        let obj:any;
        this.getFiles().subscribe((data) => {
            obj = data;
        }, error => {
            console.log(error);
        });
    }

    getFiles(): Observable<any> {
        return this.http.get('src/app/settings/group-data.json');
        // .toPromise()
        // .then(res => <TreeNode[]> res.json().data);
    }

    ngOnInit() {
        this.getFiles().then(files => this.files = files);
    }
}
