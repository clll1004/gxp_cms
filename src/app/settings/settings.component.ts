import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { LoginService } from '../login/login.service';
import { SettingsService } from '../services/apis/cms/settings/settings.service';
import { CmsApis } from '../services/apis/apis';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers: [SettingsService, CmsApis]})

export class SettingsComponent implements OnInit {
  public groupList: TreeNode[];
  public selectGroup: TreeNode;
  public groupSeq:string = this.loginService.getCookie('grp_seq');
  public params:Params;
  public tempTreeData:any[] = [];
  public treeData:any[] = [];

  public treeStyle: any;

  constructor(private activatedRoute: ActivatedRoute,
              private loginService: LoginService,
              private settingsService: SettingsService,
              private cmsApis: CmsApis) {
    this.activatedRoute.params.subscribe((params) => {
      this.params = params;
    });
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.loadGroupList();
  }

  loadGroupList() {
    this.settingsService.getLists(this.cmsApis.loadFolderList + this.groupSeq)
      .toPromise()
      .then((res) => {
        this.tempTreeData = JSON.parse(res['_body']);
        this.tempTreeData['grp'].map((item:any) => {
          item.label = item.grp_nm;
          item.data = item.grp_nm;
          item.expandedIcon = 'far fa-building';
          item.collapsedIcon = 'far fa-building';
        });
        this.tempTreeData['grp'].forEach((grpItem:any) => {
          this.treeData.push(grpItem);
        });

        this.groupList = <TreeNode[]> this.treeData;

        this.treeStyle = document.getElementById('treeObject').children[0];
        this.treeStyle.style['border-left'] = '0';
        this.treeStyle.style['border-right'] = '0';
      });
  }

  getGroupSeq() {
    this.groupSeq = this.selectGroup['grp_seq'];
  }
}
