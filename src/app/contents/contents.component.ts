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
    public groupName:string;
    public folderName:string;

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

              // console.log(this.convertTreeData(this.tempTreeData));
          });
    }

    convertTreeData(treeData:any[]) {
        let tempTreeArray:any[] = [];

        let folderTree:any = function (folderArray:any[], rootId:any, grp_seq:any) {
            let rootNodes:any[] = [];
            const convert:any = function (nodes:any[], item:any, index:any) {
                if(nodes instanceof Array) {
                    return nodes.some(function (node) {
                        if (node.gf_seq === item.gf_prnt_seq) {
                            node.children = node.children || [];
                            return node.children.push(folderArray.splice(index, 1)[0]);
                        }
                        return convert(node.children, item, index);
                    })
                }
            };

            while(folderArray.length > 0) {
                folderArray.some(function (item, index) {
                    if(item.gf_prnt_seq === rootId && item.grp_seq === grp_seq) {
                        return rootNodes.push(folderArray.splice(index, 1)[0]);
                    }
                    return convert(rootNodes, item, index);
                });
            }
            return tempTreeArray;
        };

        treeData['grp'].forEach((grpItem:any) => {
            const fol = treeData['fol'].filter((folItem:any) => {
                return grpItem.grp_seq === folItem.gf_grp_seq;
            });

            if(fol.length) {
                grpItem['children'] = folderTree(fol, "0", grpItem.grp_seq);
            }
            tempTreeArray.push(grpItem);
        });
    }
    getGroupSeq() {
        this.groupSeq = this.loginService.getCookie('grp_seq');
    }
    getFolderSeq() {
        this.loadContent(this.selectGroup['gf_seq']);
        this.groupName = this.selectGroup['parent']['label'];
        this.folderName = this.selectGroup['label'];
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
