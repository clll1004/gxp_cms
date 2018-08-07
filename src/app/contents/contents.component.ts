import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { LoginService } from "../login/login.service";
import { FolderService } from '../services/apis/cms/folder/folder.service';
import { ContentsService } from '../services/apis/cms/contents/contents.service';
import { CmsApis } from '../services/apis/apis';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http } from "@angular/http";

@Component({
    selector: 'contents',
    templateUrl: './contents.component.html',
    styleUrls: ['./contents.component.css'],
    providers: [ FolderService, ContentsService, CmsApis ]
})
export class ContentsComponent implements OnInit {
    public groupList: TreeNode[];
    public selectGroup: TreeNode;
    public groupSeq: string;
    public groupName: string;
    public folderName: string;

    public tempTreeData: any[] = [];

    public contentsLists: any[] = [];
    public filtercontentsLists: any[] = [];
    public selectItems: any[] = [];
    public searchKey: string = '';
    public filterStatus: boolean = false;

    public pvImg:any;
    public thumbpathArray:any[] = [];
    public thumbPath:string = '';

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
                private cmsApis: CmsApis,
                private http: Http) { }

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
        this.init();
    }

    init() {
        this.cid = '';
        this.gid = '';
        this.ownpath = '';
        this.pathString = '/';
    }

    loadGroupList() {
        return this.folderService.getLists(this.cmsApis.loadFolderList + this.groupSeq)
          .toPromise()
          .then((res) => {
              this.tempTreeData = JSON.parse(res['_body']);
              this.cid = this.tempTreeData['cus_nm_en'];

              this.groupList = <TreeNode[]> this.convertTreeData(this.tempTreeData);

              this.groupList.forEach((item) => {
                  item.expanded = true;
              });
              // if(!!this.selectGroup) {  }
          });
    }

    convertTreeData(treeData: any[]) {
        treeData['grp'].map((item: any) => {
            item.label = item.grp_nm;
            item.data = item.grp_nm;
            item.expandedIcon = 'far fa-building';
            item.collapsedIcon = 'far fa-building';
        });
        treeData['fol'].map((item: any) => {
            item.label = item.gf_nm;
            item.data = item.gf_nm;
            item.gf_grp_seq = item.gf_grp_seq;
            item.expandedIcon = 'fa fa-folder-open';
            item.collapsedIcon = 'fa fa-folder';
        });

        let tempTreeArray: any[] = [];

        let folderTree: any = (folderArray: any[], rootId: string, grp_seq: string) => {
            let rootNodes: any[] = [];
            let convert: any = (nodes: any[], item: any, index: any) => {
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

            while (folderArray.length > 0) {
                folderArray.some((item, index) => {
                    if (item.gf_prnt_seq === rootId && item.gf_grp_seq === grp_seq) {
                        return rootNodes.push(folderArray.splice(index, 1)[0]);
                    }
                    return convert(rootNodes, item, index);
                });
            }

            return rootNodes;
        };

        treeData['grp'].forEach((grpItem: any) => {
            const fol = treeData['fol'].filter((folItem: any) => {
                return grpItem.grp_seq === folItem.gf_grp_seq;
            });

            if (fol.length) {
                grpItem['children'] = folderTree(fol, "0", grpItem.grp_seq);
            }
            tempTreeArray.push(grpItem);
        });

        return tempTreeArray;
    }

    /*새폴더 추가*/
    addFolderTree() {
        this.showAddFolderForm = true;
        if (this.selectGroup['gf_grp_seq']) {
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
        const inputFolderName: string = this.folderform.value['gf_nm'];
        if (!!inputFolderName) {
            this.showFolderNameDupMsg = true;
            let gf_grp_seq: string = '';
            let gf_prnt_seq: string = '';
            if (this.selectGroup['gf_prnt_seq']) {
                gf_grp_seq = this.selectGroup['gf_grp_seq'];
                gf_prnt_seq = this.selectGroup['gf_seq'];
            } else {
                gf_grp_seq = this.selectGroup['grp_seq'];
                gf_prnt_seq = '0';
            }
            const url = this.cmsApis.checkDupFolderName + "gf_grp_seq=" + gf_grp_seq + "&gf_prnt_seq=" + gf_prnt_seq + "&gf_nm=" + inputFolderName;

            this.contentsService.getLists(url)
              .toPromise()
              .then((res) => {
                  this.ableFolderName = JSON.parse(res['_body']) === true;
              })
              .catch((error) => {
                  console.log(error);
              })
        }
    }

    initDupFolderName() {
        this.showFolderNameDupMsg = false;
        this.ableFolderName = false;
    }

    onSubmit(formObject: any) {
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
        this.pathArray = this.getPath(this.selectGroup);
    }

    getPath(data:TreeNode) {
        let path: any[] = [];
        const pathfn = (data: TreeNode) => {
            if (data['gr_prnt_seq'] !== '0' && data['parent']) {
                path.push(data['gf_nm']);
                pathfn(data.parent);
            }
        };
        pathfn(data);
        return path.reverse();
    }

    getGroupName(item: string): any {
        this.groupList.forEach((item2) => {
            if (item2['grp_seq'] === item) {
                this.groupName = item2['grp_nm'];
            }
        })
    }

    loadContent(folderSeq: string) {
        this.showAddFolderForm = false;
        this.showFolderNameDupMsg = false;
        this.ableFolderName = false;
        return this.contentsService.getLists(this.cmsApis.loadContentList + folderSeq)
          .toPromise()
          .then((cont) => {
              this.contentsLists = JSON.parse(cont['_body']).list;
              if (this.contentsLists) {
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
        if (this.selectItems.length && this.filtercontentsLists) {
            let isChangeStatus = confirm('변환을 재시작 하시겠습니까?');
            if(isChangeStatus) {
                let newItemArray: any[] = [];
                let itemObject: any = {};
                this.selectItems.forEach((item) => {
                    itemObject = {};
                    itemObject.fo_seq = item.fo_seq;
                    newItemArray.push(itemObject);
                });

                return this.contentsService.updateData(this.cmsApis.updateContentsStatus, newItemArray)
                  .toPromise()
                  .then(() => {
                      alert('변환이 재시작됩니다.');
                      this.selectItems = [];
                      this.loadContent(this.selectGroup['gf_seq']);
                  })
                  .catch((error: any) => {
                      console.log(error);
                  });
            }
        } else {
            return false;
        }
    }

    changeStatusDelete() {
        if (this.selectItems.length && this.filtercontentsLists) {
            let isChangeStatus = confirm('삭제하시겠습니까?');
            if (isChangeStatus) {
                let newItemArray: any[] = [];
                let itemObject: any = {};
                this.selectItems.forEach((item) => {
                    itemObject = {};
                    itemObject.fo_seq = item.fo_seq;
                    newItemArray.push(itemObject);
                });

                return this.contentsService.deleteData(this.cmsApis.updateContentsStatus, newItemArray)
                  .toPromise()
                  .then(() => {
                      alert('파일이 삭제되었습니다.');
                      this.loadContent(this.selectGroup['gf_seq']);
                  })
                  .catch((error: any) => {
                      console.log(error);
                  });
            }
        } else {
            return false;
        }
    }

    filterSearch() {
        if (!this.searchKey || !this.filtercontentsLists) {
            return false;
        }
        this.filterStatus = true;
        this.filtercontentsLists = [];
        this.contentsLists.filter((item) => {
            if (this.searchKey && item.fo_nm && item.fo_nm.indexOf(this.searchKey) >= 0) {
                this.filtercontentsLists.push(item);
            }
        });
    }

    resetFilter() {
        this.filterStatus = false;
        this.filtercontentsLists = this.contentsLists;
    }

    showPreview(item: any) {
        this.showInfos = true;
        /*썸네일 미리보기*/
        /*원본 파일 정보*/
        this.originFileInfo = item;
        this.thumbnailView(item);

        /*트랜스코딩 진행상황*/
        this.transcodingStatus = [];
        this.contentsService.getLists(this.cmsApis.loadItemTranscodingList + item.fo_seq)
          .toPromise()
          .then((cont) => {
              this.transcodingStatus = JSON.parse(cont['_body']);
              if (this.transcodingStatus) {
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
    thumbnailView(item: any) {
        this.thumbPath = '';
        this.thumbpathArray = item['fo_thumb_path'].split('/');
        this.pvImg = document.getElementById('pvThumbnail');
        if (this.thumbpathArray[0] == '0') {
            this.pvImg.src = 'http://str.gomgxp.com/src/ci_gomc.jpg';
        } else if(this.thumbpathArray[1] !== 'gxthm') {
            this.thumbpathArray.pop();
            this.thumbpathArray.push(this.thumbpathArray[this.thumbpathArray.length-1] + '0001.jpg');
            this.thumbpathArray.forEach((pathItem) => {
                this.thumbPath +=  pathItem + '/';
            });
            this.thumbPath = this.thumbPath.substring(0, this.thumbPath.length-1);

            this.contentsService.getLists('http://' + this.thumbPath)
              .toPromise()
              .then(() => {
                  this.pvImg.src = 'http://' + this.thumbPath;
              })
              .catch(() => {
                  this.pvImg.src = 'http://str.gomgxp.com/src/ci_gomc.jpg';
              })

        } else if(this.thumbpathArray[1] === 'gxthm') {
            this.thumbpathArray.pop();
            this.thumbpathArray.push('thumb-1000-w600-h390.jpg');
            this.thumbpathArray.forEach((pathItem) => {
                this.thumbPath +=  pathItem + '/';
            });
            this.thumbPath = this.thumbPath.substring(0, this.thumbPath.length-1);
            this.pvImg.src = 'http://' + this.thumbPath;
        }

    }

    changeStatusRestartItem() {
        let isChangeStatus = confirm('변환을 재시작 하시겠습니까?');
        if(isChangeStatus) {
            let newItemArray: any[] = [{'fo_seq': this.originFileInfo['fo_seq']}];

            return this.contentsService.updateData(this.cmsApis.updateContentsStatus, newItemArray)
              .toPromise()
              .then(() => {
                  alert('변환이 재시작 됩니다.');
                  this.loadContent(this.selectGroup['gf_seq']);
              })
              .catch((error: any) => {
                  console.log(error);
              });
        }
    }

    changeStatusDeleteItem() {
        let isChangeStatus = confirm('삭제하시겠습니까?');
        if(isChangeStatus) {
            let newItemArray: any[] = [{'fo_seq': this.originFileInfo['fo_seq']}];

            return this.contentsService.deleteData(this.cmsApis.updateContentsStatus, newItemArray)
              .toPromise()
              .then(() => {
                  alert('파일이 삭제됩니다.');
                  this.loadContent(this.selectGroup['gf_seq']);
              })
              .catch((error: any) => {
                  console.log(error);
              });
        }
    }

    /*다이얼로그*/
    public isModalDisplay: boolean = false;
    public isButtonsDisable: boolean = false;
    /*파일 업로드 다이얼로그*/
    public cid: string = '';
    public gid: string = '';
    public ownpath: string = '';
    public pathArray: any[] = [];
    public pathString: string = '/';
    public authKey: string = '5C8F8FD268A6D8FD2D38C5140D533D2A4F85D362F43BFEA69B5E593024CC7B88';

    fileUploadDisplay() {
        this.isModalDisplay = true;
    }

    fileUplod(event: any, form:any) {
        this.isButtonsDisable = true;
        this.groupList.forEach((item) => {
            if (this.selectGroup['gf_grp_seq'] === item['grp_seq']) {
                this.gid = item['grp_nm'];
            }
        });
        this.ownpath = '/' + this.cid + '/' + this.gid + '/';
        this.pathString = '/';
        this.pathArray.forEach((item) => {
            this.pathString += item + "/";
        });

        let files: FileList = event.files;
        let formData: FormData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append('file', files[i]);
        }

        this.contentsService.uploadFile(this.ownpath, this.pathString, this.authKey, formData)
          .toPromise()
          .then(() => {
             alert('파일 업로드가 완료되었습니다. \n목록 반영까지 1~3분 소요됩니다.');
             form.clear();
             this.isModalDisplay = false;
             this.loadContent(this.selectGroup['gf_seq']);
          })
          .catch((err) => {
              console.log(err);
          })
    }
}
