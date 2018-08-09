import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { CmsApis } from '../services/apis/apis';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from "../login/login.service";
import { FolderService } from '../services/apis/cms/folder/folder.service';
import { ContentsService } from '../services/apis/cms/contents/contents.service';
import { ConfirmationService } from 'primeng/components/common/api';

@Component({
    selector: 'contents',
    templateUrl: './contents.component.html',
    styleUrls: ['./contents.component.css'],
    providers: [ FolderService, ContentsService, CmsApis, ConfirmationService ]
})
export class ContentsComponent implements OnInit {
    public groupList: TreeNode[];
    public selectGroup: TreeNode;
    public tempTreeData: any[] = [];
    public groupSeq: string = '';
    public folderPath: object = {};

    public transcodingStatusValue: object = {
        'U': '업로드 완료',
        'TR': '변환 요청',
        'OF': '원본전송실패',
        'TT': '변환중',
        'TF': '변환실패',
        'SF': '배포실패',
        'SS': '완료'
    };
    public contentsLists: any[] = [];
    public filtercontentsLists: any[] = [];
    public selectItems: any[] = [];
    public searchKey: string = '';
    public filterStatus: boolean = false;

    public showInfos: boolean = false;
    public pvImg:any;
    public thumbpathArray:any[] = [];
    public thumbPath:string = '';
    public transcodingStatus: any[] = [];
    public originFileInfo: any[] = [];

    public isShowFolderMessage: boolean = false;
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

    /*다이얼로그*/
    public isModalDisplay: boolean = false;
    public isShowUploadMessage: boolean = false;
    /*파일 업로드 세팅*/
    public cid: string = '';
    public gid: string = '';
    public ownpath: string = '';
    public pathArray: any[] = [];
    public pathString: string = '/';
    public authKey: string = '5C8F8FD268A6D8FD2D38C5140D533D2A4F85D362F43BFEA69B5E593024CC7B88';
    public uploadFiles: any[] = [];
    public uploadFormData: FormData = new FormData();
    public isUploading:boolean = false;
    public progressPercent:number = 0;

    constructor(private formBuilder: FormBuilder,
                private loginService: LoginService,
                private folderService: FolderService,
                private contentsService: ContentsService,
                private cmsApis: CmsApis,
                private confirmationService: ConfirmationService) { }

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

    getGroupSeq() {
        this.groupSeq = this.loginService.getCookie('grp_seq');
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

    loadFolder() {
        this.getFolderPath();
        this.loadContent(this.selectGroup['gf_seq']);
        this.previewInit();
    }

    getFolderPath() {
        let path: any[] = [];
        const getFolderPath = (data: TreeNode) => {
            if (data['gr_prnt_seq'] !== '0' && data['parent']) {
                path.push(data['gf_nm']);
                getFolderPath(data.parent);
            }
        };
        getFolderPath(this.selectGroup);

        this.pathArray = path.reverse();
        this.folderPath['folderName'] = this.pathArray[this.pathArray.length-1];
        this.tempTreeData['grp'].forEach((item) => {
            if(item.grp_seq === this.selectGroup['gf_seq']) {
                this.folderPath['groupName'] = item.grp_nm;
            }
        });
    }

    loadContent(folderSeq: string) {
        this.showAddFolderForm = false;
        this.showFolderNameDupMsg = false;
        this.ableFolderName = false;
        this.contentsService.getLists(this.cmsApis.loadContentList + folderSeq)
          .toPromise()
          .then((cont) => {
              this.contentsLists = JSON.parse(cont['_body']).list;
              if (this.contentsLists) {
                  this.contentsLists.forEach((item) => {
                      if (this.transcodingStatusValue.hasOwnProperty(item.fo_status)) {
                          item.statusLabel = this.transcodingStatusValue[item.fo_status];
                      } else {
                          item.statusLabel = '실패'
                      }
                  });
              }
              this.filtercontentsLists = this.contentsLists;
          });
    }

    previewInit() {
        this.selectItems = [];
        this.originFileInfo = [];
        this.showInfos = false;
    }

    changeStatusRestart() {
        if (this.selectItems.length && this.filtercontentsLists) {
            this.confirmationService.confirm({
                message: '변환을 재시작 하시겠습니까?',
                accept: () => {
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
                          this.selectItems = [];
                          this.loadContent(this.selectGroup['gf_seq']);
                      })
                      .catch((error: any) => {
                          console.log(error);
                      });
                }
            });
        }
    }

    changeStatusDelete() {
        if (this.selectItems.length && this.filtercontentsLists) {
            this.confirmationService.confirm({
                message: '삭제하시겠습니까?',
                accept: () => {
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
                          this.selectItems = [];
                          this.loadContent(this.selectGroup['gf_seq']);
                          this.previewInit();
                      })
                      .catch((error: any) => {
                          console.log(error);
                      });
                }
            });
        }
    }

    changeStatusRestartItem() {
        this.confirmationService.confirm({
            message: '변환을 재시작 하시겠습니까?',
            accept: () => {
                let newItemArray: any[] = [{'fo_seq': this.originFileInfo['fo_seq']}];

                return this.contentsService.updateData(this.cmsApis.updateContentsStatus, newItemArray)
                  .toPromise()
                  .then(() => {
                      this.selectItems = [];
                      this.loadContent(this.selectGroup['gf_seq']);
                  })
                  .catch((error: any) => {
                      console.log(error);
                  });
            }
        });
    }

    changeStatusDeleteItem() {
        this.confirmationService.confirm({
            message: '삭제하시겠습니까?',
            accept: () => {
                let newItemArray: any[] = [{'fo_seq': this.originFileInfo['fo_seq']}];

                return this.contentsService.deleteData(this.cmsApis.updateContentsStatus, newItemArray)
                  .toPromise()
                  .then(() => {
                      this.selectItems = [];
                      this.loadContent(this.selectGroup['gf_seq']);
                      this.previewInit();
                  })
                  .catch((error: any) => {
                      console.log(error);
                  });
            }
        });
    }

    showFolderForm() {
        if(Number(this.selectGroup['gf_level']) >= 8) {
            this.isShowFolderMessage = true;
        } else {
            this.showAddFolderForm = true;
            if (this.selectGroup['gf_grp_seq']) { // 폴더인 경우
                this.folderFormInit(this.selectGroup['gf_grp_seq'], null, this.selectGroup['gf_seq'], String(Number(this.selectGroup['gf_level']) + 1));
            } else { // 그룹인 경우
                this.folderFormInit(this.selectGroup['grp_seq'], null, '0', '1');
            }
        }
    }

    folderFormInit(grp_seq:string, gf_nm:string, gf_prnt_seq:string, gf_level:string) {
        this.folderform.get('gf_grp_seq').setValue(grp_seq);
        this.folderform.get('gf_nm').setValue(gf_nm);
        this.folderform.get('gf_prnt_seq').setValue(gf_prnt_seq);
        this.folderform.get('gf_level').setValue(gf_level);
    }

    DupFolderName() {
        const inputFolderName: string = this.folderform.value['gf_nm'];
        if (!!inputFolderName) {
            this.showFolderNameDupMsg = true;

            const url = this.cmsApis.checkDupFolderName + "gf_grp_seq=" + this.folderform.get('gf_grp_seq').value + "&gf_prnt_seq=" + this.folderform.get('gf_prnt_seq').value + "&gf_nm=" + inputFolderName;

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

    addFolder(formObject: any) {
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

    contentSearch() {
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
        this.originFileInfo = item;
        this.loadPreviewThumbnail(item);

        /*트랜스코딩 진행상황*/
        this.transcodingStatus = [];
        this.contentsService.getLists(this.cmsApis.loadItemTranscodingList + item.fo_seq)
          .toPromise()
          .then((cont) => {
              this.transcodingStatus = JSON.parse(cont['_body']);
              if (this.transcodingStatus) {
                  this.transcodingStatus.forEach((item) => {
                      if (this.transcodingStatusValue.hasOwnProperty(item.ft_status)) {
                          item.statusLabel = this.transcodingStatusValue[item.ft_status];
                      } else {
                          item.statusLabel = '실패'
                      }
                  });
              }
          });
    }

    loadPreviewThumbnail(item: any) {
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

    fileUplod(event: any, form:any) {
        this.setUploadHeader();
        this.setUploadData(event);
        this.showProgress();
        this.contentsService.uploadFile(this.ownpath, this.pathString, this.authKey, this.uploadFormData)
          .toPromise()
          .then(() => {
              this.progressPercent = 100;
              this.isShowUploadMessage = true;
              this.loadContent(this.selectGroup['gf_seq']);
              form.clear();
          })
          .catch((err) => {
              console.log(err);
          })
    }

    setUploadHeader() {
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
    }

    setUploadData(userFile) {
        this.uploadFiles = userFile.files;
        for (let i = 0; i < this.uploadFiles.length; i++) {
            this.uploadFormData.append('file', this.uploadFiles[i]);
        }
    }

    showProgress() {
        this.progressPercent = 0;
        this.isUploading = true;
        setInterval(() => {
            if(this.progressPercent < 50) {
                this.progressPercent += Math.floor(Math.random() * ((10-5)+1) + 5); // 5-10 랜덤
            }
        }, 500);
    }

    setUploadStyle() {
        let uploadContainer = document.getElementById('uploadDailog-container');
        uploadContainer.children[0].children[0].children[1].setAttribute("style", "height: 250px; overflow-y: scroll;");
    }

    UploadInit() {
        this.uploadFiles = [];
    }
}
