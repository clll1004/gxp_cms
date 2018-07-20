import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Http, Headers } from '@angular/http';
import { LoginService } from "../login/login.service";

@Component({
    selector: 'contents',
    templateUrl: './contents.component.html',
    styleUrls: ['./contents.component.css']
})
export class ContentsComponent implements OnInit {
    public groupList: TreeNode[];
    public selectGroup: TreeNode;
    public groupSeq:string;

    public dummy = [
        {
            'label': 'GXP', // grp_nm
            'data': 'grp_nm', // grp_nm
            'expandedIcon': 'far fa-building',
            'collapsedIcon': 'far fa-building',
            'children': [
                {
                    'label': 'fol1', // gf_nm
                    'data': 'fol1', // gf_nm
                    'gf_seq': '1', // gf_seq
                    'expandedIcon': 'fa fa-folder-open',
                    'collapsedIcon': 'fa fa-folder',
                    'children': [
                        {
                            'label': 'fol2-1', // gf_nm
                            'data': 'fol2-1', // gf_nm
                            'gf_seq': '2', // gf_seq
                            'expandedIcon': 'fa fa-folder-open',
                            'collapsedIcon': 'fa fa-folder',
                            'children': [
                                {
                                    'label': 'fol3', // gf_nm
                                    'data': 'fol3', // gf_nm
                                    'gf_seq': '3', // gf_seq
                                    'expandedIcon': 'fa fa-folder-open',
                                    'collapsedIcon': 'fa fa-folder'
                                }
                            ]
                        },
                        {
                            'label': 'fol2-3', // gf_nm
                            'data': 'fol2-3', // gf_nm
                            'gf_seq': '4', // gf_seq
                            'expandedIcon': 'fa fa-folder-open',
                            'collapsedIcon': 'fa fa-folder'
                        }
                    ]
                }
            ]
        }
    ];

    public tempTreeData:any[] = [];
    public treeData:any[] = [];
    public folderData:any[] = [];
    public tempFolderData:any[] = [];

    public contentsLists: any[] = [];
    public filtercontentsLists: any[] = [];
    public selectItems:any[] = [];
    public searchKey: string = '';

    public showInfos: boolean = false;
    public transcodingStatus: any[] = [];
    public originFileInfo: any[] = [];

    public contentCols: any[] = [
        {field: '', header: '', width: '5%'},
        {field: '', header: '제목', width: '30%'},
        {field: '', header: '종류', width: '10%'},
        {field: '', header: '크기', width: '15%'},
        {field: '', header: '전체 변환율', width: '20%'},
        {field: '', header: '생성 날짜', width: '20%'},
    ];

    constructor(private http: Http, private loginService: LoginService) { }
    ngOnInit() {
        this.load();
    }

    load() {
        this.getGroupSeq();
        this.loadGroupList();
        this.loadContent('');
    }

    loadGroupList() {
        return this.http.get('http://183.110.11.49/cms/folder/list/' + this.groupSeq)
          .toPromise()
          .then((res) => {
               this.tempTreeData = JSON.parse(res['_body']);
              this.groupList = <TreeNode[]> this.dummy;
              // if(this.tempTreeData['grp']) {
              //     this.tempTreeData['grp'].forEach((grpItem:any) => {
              //         const grp:object = {};
              //
              //         grp['label'] = grpItem.grp_nm;
              //         grp['data'] = grpItem.grp_nm;
              //         grp['expandedIcon'] = 'far fa-building';
              //         grp['collapsedIcon'] = 'far fa-building';
              //
              //         this.folderData = this.tempTreeData['fol'];
              //         this.convertTreeData(this.folderData);
              //
              //         grp['children'] = this.tempFolderData;
              //         this.treeData.push(grp);
              //     });
              //     this.groupList = <TreeNode[]> this.treeData;
              // }
          });
    }

    convertTreeData(folderData:any[]) {
        // if(tempTreeData['fol']) {
        //     const fol = tempTreeData['fol'].filter((folItem:any) => {
        //         folItem['label'] = folItem.gf_nm;
        //         folItem['data'] = folItem.gf_nm;
        //         folItem['expandedIcon'] = 'fa fa-folder-open';
        //         folItem['collapsedIcon'] = 'fa fa-folder';
        //         return grpItem.grp_seq === folItem.gf_grp_seq && (folItem.gf_prnt_seq === '0');
        //     });
        //
        //     grp['children'] = fol;
        // }
        if(folderData.length !== 0) {  //?
            folderData.forEach((item:any) => {
                item['label'] = item.gf_nm;
                item['data'] = item.gf_nm;
                item['expandedIcon'] = 'fa fa-folder-open';
                item['collapsedIcon'] = 'fa fa-folder';

                if(item.gf_prnt_seq === '0') {
                    this.tempFolderData.push(item);
                } else {
                    // fdD.for it2 {
                    //     템프[gf_seq - 1][children] = it1.grseq === it2.gf_prnt_seq
                    //     데이터.push(템프)
                    // }
                }
            });
            // this.convertTreeData(this.folderData);
        }

    }
    getGroupSeq() {
        this.groupSeq = this.loginService.getCookie('grp_seq');
    }
    getFolderSeq() {
        this.loadContent(this.selectGroup['gf_seq']);
    }
    loadContent(folderSeq:string) {
        return this.http.get('http://183.110.11.49/cms/contents/list?page=1&row=10000&gf_seq=' + folderSeq)
          .toPromise()
          .then((cont) => {
              this.contentsLists = JSON.parse(cont['_body']).list;
              if(this.contentsLists) {
                  this.contentsLists.forEach((item) => {
                      if (item.fo_status == 'U') {
                          item.statusLabel = '업로드완료';
                      } else if (item.fo_status == 'TR') {
                          item.statusLabel = '변환요청';
                      } else if (item.fo_status == 'OF') {
                          item.statusLabel = '대기중';
                      } else if (item.fo_status == 'TT') {
                          item.statusLabel = '변환중';
                      } else if (item.fo_status == 'TF') {
                          item.statusLabel = '변환실패';
                      } else if (item.fo_status == 'SS') {
                          item.statusLabel = '전송완료';
                      } else if (item.fo_status == 'SF') {
                          item.statusLabel = '전송실패';
                      }
                  });
              }
              this.filtercontentsLists = this.contentsLists;
          });
    }

    changeStatusRestart() {
        let newItemArray:any[] = [];
        let itemObject:any = {};
        this.selectItems.forEach((item) => {
            itemObject = {};
            itemObject.fo_seq = item.fo_seq;
            newItemArray.push(itemObject);
        });

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
        console.log(this.selectItems);
    }
    filterSearch() {
        this.filtercontentsLists = [];
        this.contentsLists.filter((item) => {
            if(this.searchKey && item.fo_nm && item.fo_nm.indexOf(this.searchKey) >= 0) {
                this.filtercontentsLists.push(item);
            }
        });
    }

    showPreview(item:any) {
        this.showInfos = true;
        /*썸네일 미리보기*/
        /*원본 파일 정보*/
        this.originFileInfo = item;

        /*트랜스코딩 진행상황*/
        this.transcodingStatus = [];
        this.http.get('http://183.110.11.49/cms/contents/list/tcd/' + item.fo_seq)
          .toPromise()
          .then((cont) => {
              this.transcodingStatus = JSON.parse(cont['_body']);
              if(this.transcodingStatus) {
                  this.transcodingStatus.forEach((item) => {
                      if (item.ft_status == 'U') {
                          item.statusLabel = '업로드완료';
                      } else if (item.ft_status == 'TR') {
                          item.statusLabel = '변환요청';
                      } else if (item.ft_status == 'TT') {
                          item.statusLabel = '변환중';
                      } else if (item.ft_status == 'TS') {
                          item.statusLabel = '변환완료';
                      } else if (item.ft_status == 'TF') {
                          item.statusLabel = '변환실패';
                      } else if (item.ft_status == 'SS') {
                          item.statusLabel = '전송완료';
                      } else if (item.ft_status == 'SF') {
                          item.statusLabel = '전송실패';
                      }
                  });
              }
          });

    }
}
