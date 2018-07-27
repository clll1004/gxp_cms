import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { LoginService } from "../login/login.service";
import { FolderService } from '../services/apis/cms/folder/folder.service';
import { ContentsService } from '../services/apis/cms/contents/contents.service';
import { CmsApis } from '../services/apis/apis';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'contents',
    templateUrl: './contents.component.html',
    styleUrls: ['./contents.component.css'],
    providers: [ FolderService, ContentsService, CmsApis ]
})
export class ContentsComponent implements OnInit {
    public groupList: TreeNode[];
    public selectGroup: TreeNode;
    public groupSeq:string;
    public groupName:string;
    public folderName:string;

    public tempTreeData:any[] = [];

    public contentsLists: any[] = [];
    public filtercontentsLists: any[] = [];
    public selectItems:any[] = [];
    public searchKey: string = '';

    public showInfos: boolean = false;
    public transcodingStatus: any[] = [];
    public isShowDialogBtn: boolean = false;
    public originFileInfo: any[] = [];

    public showAddFolderForm: boolean = false;
    public folderform: FormGroup;
    public ableFolderName: boolean = false;
    public showFolderNameDupMsg: boolean = false;

    public contentCols: any[] = [
        {field: '', header: '', width: '5%'},
        {field: '', header: '제목', width: '30%'},
        {field: '', header: '크기', width: '15%'},
        {field: '', header: '전체 변환율', width: '20%'},
        {field: '', header: '생성 날짜', width: '20%'},
    ];

    constructor(private formBuilder: FormBuilder,
                private loginService: LoginService,
                private folderService: FolderService,
                private contentsService: ContentsService,
                private cmsApis: CmsApis) { }

    ngOnInit() {
        this.load();
        this.folderform = this.formBuilder.group({
            'gf_grp_seq': new FormControl(null),
            'gf_nm': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(20)])),
            'gf_prnt_seq': new FormControl(null),
            'gf_level': new FormControl(null)
        });
    }

    load() {
        this.getGroupSeq();
        this.loadGroupList();
    }
    loadGroupList() {
        return this.folderService.getLists(this.cmsApis.loadFolderList + this.groupSeq)
          .toPromise()
          .then((res) => {
              this.tempTreeData = JSON.parse(res['_body']);
              this.groupList = <TreeNode[]> this.convertTreeData(this.tempTreeData);

              this.groupList.forEach((item) => {
                  item.expanded = true;
              });
              // if(!!this.selectGroup) {  }
          });
    }
    convertTreeData(treeData:any[]) {
        treeData['grp'].map((item:any) => {
            item.label = item.grp_nm;
            item.data = item.grp_nm;
            item.expandedIcon = 'far fa-building';
            item.collapsedIcon = 'far fa-building';
        });
        treeData['fol'].map((item:any) => {
            item.label = item.gf_nm;
            item.data = item.gf_nm;
            item.expandedIcon = 'fa fa-folder-open';
            item.collapsedIcon = 'fa fa-folder';
        });

        let tempTreeArray:any[] = [];

        let folderTree:any = (folderArray:any[], rootId:string, grp_seq:string) => {
            let rootNodes:any[] = [];
            let convert:any = (nodes:any[], item:any, index:any) => {
                if (nodes instanceof Array) {
                    return nodes.some((node) => {
                        if (node.gf_seq === item.gf_prnt_seq) {
                            node.children = node.children || [];
                            return node.children.push(folderArray.splice(index, 1)[0]);
                        }
                        return convert(node.children, item, index);
                    })
                }
            };

            while(folderArray.length > 0) {
                folderArray.some((item, index) => {
                    if (item.gf_prnt_seq === rootId && item.gf_grp_seq === grp_seq) {
                        return rootNodes.push(folderArray.splice(index, 1)[0]);
                    }
                    return convert(rootNodes, item, index);
                });
            }

            return rootNodes;
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

        return tempTreeArray;
    }

    /*새폴더 추가*/
    addFolderTree() {
        this.showAddFolderForm = true;
        if(this.selectGroup['gf_grp_seq']) {
            this.folderform.get('gf_grp_seq').setValue(this.selectGroup['gf_grp_seq']);
            this.folderform.get('gf_nm').setValue(null);
            this.folderform.get('gf_prnt_seq').setValue(this.selectGroup['gf_seq']);
            this.folderform.get('gf_level').setValue(String(Number(this.selectGroup['gf_level']) + 1));
        } else {
            this.folderform.get('gf_grp_seq').setValue(this.selectGroup['grp_seq']);
            this.folderform.get('gf_nm').setValue(null);
            this.folderform.get('gf_prnt_seq').setValue('0');
            this.folderform.get('gf_level').setValue('1');
        }
    }
    confirmFolderName() {
        this.showFolderNameDupMsg = true;
        const InputFolderName:string = this.folderform.value['gf_nm'];
        const url = this.cmsApis.checkDupFolderName + "gf_grp_seq=" + this.selectGroup['gf_grp_seq'] + "&gf_level=" + String(Number(this.selectGroup['gf_level']) + 1) + "&gf_nm=" + InputFolderName;
        this.contentsService.getLists(url)
          .toPromise()
          .then((res) => {
            this.ableFolderName = JSON.parse(res['_body']) === true;
          })
          .catch((error) => {
            console.log(error);
          })
    }
    initDupFolderName() {
        this.showFolderNameDupMsg = false;
        this.ableFolderName = false;
    }
    onSubmit(formObject:any) {
        this.contentsService.postData(this.cmsApis.postFolder, formObject)
          .toPromise()
          .then(() => {
              this.showAddFolderForm = false;
              this.loadGroupList();
          })
          .catch((error) => {
              console.log(error);
          });
    }

    getGroupSeq() {
        this.groupSeq = this.loginService.getCookie('grp_seq');
    }
    getFolderSeq() {
        this.originFileInfo = [];
        this.showInfos = false;
        this.loadContent(this.selectGroup['gf_seq']);
        this.getGroupName(this.selectGroup['gf_grp_seq']);
        this.folderName = this.selectGroup['gf_nm'];
    }
    getGroupName(item:string):any {
        this.groupList.forEach((item2) => {
            if(item2['grp_seq'] === item) {
                this.groupName = item2['grp_nm'];
            }
        })
    }
    loadContent(folderSeq:string) {
        this.showAddFolderForm = false;
        this.showFolderNameDupMsg = false;
        this.ableFolderName = false;
        return this.contentsService.getLists(this.cmsApis.loadContentList + folderSeq)
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
                          item.statusLabel = '원본전송실패';
                      } else if (item.fo_status == 'TT') {
                          item.statusLabel = '변환중';
                      } else if (item.fo_status == 'TF') {
                          item.statusLabel = '변환실패';
                      } else if (item.fo_status == 'SF') {
                          item.statusLabel = '배포실패';
                      } else if (item.fo_status == 'SS') {
                          item.statusLabel = '완료';
                      }
                  });
              }
              this.filtercontentsLists = this.contentsLists;
          });
    }

    changeStatusRestart() {
        if(!this.selectItems.length || !this.filtercontentsLists) {
            return false;
        }
        let newItemArray:any[] = [];
        let itemObject:any = {};
        this.selectItems.forEach((item) => {
            itemObject = {};
            itemObject.fo_seq = item.fo_seq;
            newItemArray.push(itemObject);
        });

        return this.contentsService.updateData(this.cmsApis.restartContentsTranscoding, newItemArray)
          .toPromise()
          .then(() => {alert('변환이 재시작됩니다.');})
          .catch((error:any) => {
              console.log(error);
          });
    }
    changeStatusDelete() {
        console.log(this.selectItems);
    }

    filterSearch() {
        if(!this.searchKey || !this.filtercontentsLists) {
            return false;
        }
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
        this.contentsService.getLists(this.cmsApis.loadItemTranscodingList + item.fo_seq)
          .toPromise()
          .then((cont) => {
              this.transcodingStatus = JSON.parse(cont['_body']);
              if(this.transcodingStatus) {
                  this.transcodingStatus.forEach((item) => {
                      this.isShowDialogBtn = false;
                      if (item.ft_status == 'U') {
                          item.statusLabel = '업로드완료';
                      } else if (item.ft_status == 'TR') {
                          item.statusLabel = '변환요청';
                      } else if (item.ft_status == 'OF') {
                          item.statusLabel = '원본전송실패';
                      } else if (item.ft_status == 'TT') {
                          item.statusLabel = '변환중';
                      } else if (item.ft_status == 'TF') {
                          item.statusLabel = '변환실패';
                      } else if (item.ft_status == 'SF') {
                          item.statusLabel = '배포실패';
                      } else if (item.ft_status == 'SS') {
                          this.isShowDialogBtn = true;
                          item.statusLabel = '완료';
                      }
                  });
              }
          });
    }
    changeStatusRestartItem() {
        let newItemArray:any[] = [{'fo_seq': this.originFileInfo['fo_seq']}];

        return this.contentsService.updateData(this.cmsApis.restartContentsTranscoding, newItemArray)
          .toPromise()
          .then(() => {alert('변환이 재시작 됩니다.');})
          .catch((error:any) => {
              console.log(error);
          });
    }
    changeStatusDeleteItem() {
        console.log(this.originFileInfo);
    }
}
