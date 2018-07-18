import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Http } from "@angular/http";
import { TreeNode } from 'primeng/api';

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {
    public groupList: TreeNode[];
    public selectGroup: TreeNode;
    public groupData: any[] = [];
    public transOptions: any[] = [];
    public groupSeq:string = '1';
    public params:Params;

    constructor(private activatedRoute: ActivatedRoute, private http: Http) {
        this.activatedRoute.params.subscribe( (params) => {
            this.params = params;
        });

    }
    ngOnInit() {
        this.load();
    }

    load() {
        this.loadGroupList();
        this.loadGroupData();
    }

    loadGroupList() {
        return this.http.get('http://localhost:8080/src/app/settings/group-data.json')
          .toPromise()
          .then((res) => {
              this.groupList = <TreeNode[]> res.json().data;
          });
    }
    getGroupSeq() {
        if (this.selectGroup.label === 'GXP') {
            this.groupSeq = '1';
        } else if (this.selectGroup.label === 'grp2') {
            this.groupSeq = '2';
        }
        this.loadGroupData();
    }

    loadGroupData() {
        return this.http.get('http://183.110.11.49/cms/setting/group/' + this.groupSeq)
          .toPromise()
          .then((cont) => {
              this.groupData = JSON.parse(cont['_body']).grp;
              this.transOptions = JSON.parse(cont['_body']).tcd;
          });
    }
}
