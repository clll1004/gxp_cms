import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Http } from "@angular/http";
import { TreeNode } from 'primeng/api';
import { LoginService } from "../login/login.service";

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css'],
    providers: [ LoginService ]
})

export class SettingsComponent implements OnInit {
    public groupList: TreeNode[];
    public selectGroup: TreeNode;
    public groupData: any[] = [];
    public transOptions: any[] = [];
    public groupSeq:string = this.loginService.getCookie('grp_seq');
    public params:Params;
    public tempTreeData:any[] = [];
    public treeData:any[] = [];

    constructor(private activatedRoute: ActivatedRoute, private http: Http, private loginService: LoginService) {
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
        // return this.http.get('http://localhost:8080/src/app/settings/group-data.json')
        //   .toPromise()
        //   .then((res) => {
        //       this.groupList = <TreeNode[]> res.json().data;
        //   });

        return this.http.get('http://183.110.11.49/cms/folder/list/' + this.groupSeq)
          .toPromise()
          .then((res) => {
              this.tempTreeData = JSON.parse(res['_body']);
              if(this.tempTreeData['grp']) {
                  this.tempTreeData['grp'].forEach((grpItem:any) => {
                      const grp:object = {};

                      grp['grp_seq'] = grpItem.grp_seq;
                      grp['label'] = grpItem.grp_nm;
                      grp['data'] = grpItem.grp_nm;
                      grp['expandedIcon'] = 'far fa-building';
                      grp['collapsedIcon'] = 'far fa-building';

                      this.treeData.push(grp);
                  });
                  this.groupList = <TreeNode[]> this.treeData;
              }
          });
    }
    getGroupSeq() {
        this.groupSeq = this.selectGroup['grp_seq'];
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
