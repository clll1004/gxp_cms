import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { CmsApis } from '../../services/apis/apis';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CookieService } from '../../services/library/cookie/cookie.service';
import { FolderService } from '../../services/apis/cms/folder/folder.service';
import { ContentsService } from '../../services/apis/cms/contents/contents.service';
import { ConfirmationService } from 'primeng/components/common/api';

@Component({
  selector: 'contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.css'],
  providers: [ConfirmationService]})

export class ContentsComponent implements OnInit {
  public isListLoading:boolean = false;
  public isContentsLoading:boolean = false;
  public isThumbLoading:boolean = false;
  public isTcStatusLoading:boolean = false;
  public isFileInfoLoading:boolean = false;

  public isShow:boolean = false;
  public popupType:string = '';
  public popupMessage:string = '';
  public changeStatusAction:string = '';
  public changeStatusMode:string = '';

  public groupList: TreeNode[];
  public selectGroup: TreeNode;
  public tempTreeData: any[] = [];
  public groupSeq: string = '';
  public folderPath: object = {};
  public transCodingStatusValue: object = {
    U: '업로드 완료',
    TR: '변환 요청',
    OF: '원본전송실패',
    TT: '변환중',
    TF: '변환실패',
    SF: '배포실패',
    SS: '완료' };
  /*콘텐츠 리스트*/
  public contentCols: any[] = [
    { field: '', header: '', width: '5%' },
    { field: '', header: '제목', width: '30%' },
    { field: '', header: '크기', width: '15%' },
    { field: '', header: '전체 변환율', width: '20%' },
    { field: '', header: '생성 날짜', width: '20%' }];
  public contentsLists: any[] = [];
  public filterContentsLists: any[] = [];
  /*search*/
  public selectItems: any[] = [];
  public searchKey: string = '';
  public searchStatus: boolean = false;
  /*preview*/
  public showPreview: boolean = false;
  public pvImg:any;
  public thumbPathArray:any[] = [];
  public thumbPath:string = '';
  public transCodingStatus: any[] = [];
  public originFileInfo: any[] = [];
  /*folder*/
  public showAddFolderForm: boolean = false;
  public folderForm: FormGroup;
  public ableFolderName: boolean = false;
  public showFolderNameDupMsg: boolean = false;

  /*다이얼로그*/
  public isModalDisplay: boolean = false;
  /*파일 업로드 세팅*/
  public cid: string = '';
  public gid: string = '';
  public ownPath: string = '';
  public pathArray: any[] = [];
  public pathString: string = '/';
  public authKey: string = '5C8F8FD268A6D8FD2D38C5140D533D2A4F85D362F43BFEA69B5E593024CC7B88';
  public uploadFiles: any[] = [];
  public uploadFormData: FormData = new FormData();
  public isUploading:boolean = false;
  public progressPercent:number = 0;

  public treeStyle: any;

  constructor(private formBuilder: FormBuilder,
              private cookieService: CookieService,
              private folderService: FolderService,
              private contentsService: ContentsService,
              private cmsApi: CmsApis,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.load();
    this.folderForm = this.formBuilder.group({
      gf_grp_seq: new FormControl(null),
      gf_nm: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(20)])),
      gf_prnt_seq: new FormControl(null),
      gf_level: new FormControl(null),
    });
  }

  load() {
    this.getGroupSeq();
    this.loadGroupList();
  }

  getGroupSeq() {
    this.groupSeq = this.cookieService.getCookie('grp_seq');
  }

  loadGroupList() {
    this.isListLoading = true;
    this.folderService.getLists(this.cmsApi.loadFolderList + this.groupSeq)
      .toPromise()
      .then((res) => {
        this.tempTreeData = JSON.parse(res['_body']);
        this.cid = this.tempTreeData['cus_nm_en'];
        this.groupList = <TreeNode[]> this.convertTreeData(this.tempTreeData);
        this.groupList.forEach((item) => {
          item.expanded = true;
        });
        if (this.groupList[0].children) {
          this.selectGroup = this.groupList[0].children[0];
          this.loadFolder();
        }

        this.treeStyle = document.getElementById('treeObject').children[0];
        this.treeStyle.style['border-left'] = '0';
        this.treeStyle.style['border-right'] = '0';
      })
      .then(() => {
        this.isListLoading = false;
      });
  }

  convertTreeData(treeData: any[]) {
    treeData['grp'].map((item: any) => {
      item.label = item.grp_nm;
      item.data = item.grp_nm;
      item.expandedIcon = 'far fa-building';
      item.collapsedIcon = 'far fa-building';
    });
    if (treeData['fol']) {
      treeData['fol'].map((item: any) => {
        item.label = item.gf_nm;
        item.data = item.gf_nm;
        item['gf_grp_seq'] = item.gf_grp_seq;
        item.expandedIcon = 'fa fa-folder-open';
        item.collapsedIcon = 'fa fa-folder';
      });
    }

    const tempTreeArray: any[] = [];

    const folderTree: any = (folderArray: any[], rootId: string, grpSeq: string) => {
      const rootNodes: any[] = [];
      const convert: any = (nodes: any[], item: any, index: any) => {
        if (nodes instanceof Array) {
          return nodes.some((node) => {
            if (node.gf_seq === item.gf_prnt_seq) {
              node.children = node.children || [];
              return node.children.push(folderArray.splice(index, 1)[0]);
            }
            return convert(node.children, item, index);
          });
        }
      };

      while (folderArray.length > 0) {
        folderArray.forEach((item, index) => {
          if (item.gf_prnt_seq === rootId && item.gf_grp_seq === grpSeq) {
            return rootNodes.push(folderArray.splice(index, 1)[0]);
          }
          return convert(rootNodes, item, index);
        });
      }

      return rootNodes;
    };

    treeData['grp'].forEach((grpItem: any) => {
      let fol:any;
      if (treeData['fol']) {
        fol = treeData['fol'].filter((folItem: any) => {
          return grpItem.grp_seq === folItem.gf_grp_seq;
        });
      }

      if (fol) {
        grpItem['children'] = folderTree(fol, '0', grpItem.grp_seq);
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
    const path: any[] = [];
    const getFolderPath = (data: TreeNode) => {
      if (data['gr_prnt_seq'] !== '0' && data['parent']) {
        path.push(data['gf_nm']);
        getFolderPath(data.parent);
      }
    };
    getFolderPath(this.selectGroup);

    this.pathArray = path.reverse();
    this.folderPath['folderName'] = this.pathArray[this.pathArray.length - 1];
    this.tempTreeData['grp'].forEach((item) => {
      if (item.grp_seq === this.selectGroup['gf_seq']) {
        this.folderPath['groupName'] = item.grp_nm;
      }
    });
  }

  loadContent(folderSeq: string) {
    this.filterContentsLists = [];
    this.isContentsLoading = true;
    this.showAddFolderForm = false;
    this.showFolderNameDupMsg = false;
    this.ableFolderName = false;
    this.contentsService.getLists(this.cmsApi.loadContentList + folderSeq)
      .toPromise()
      .then((cont) => {
        this.contentsLists = JSON.parse(cont['_body']).list;
        if (this.contentsLists) {
          this.contentsLists.forEach((item) => {
            if (this.transCodingStatusValue.hasOwnProperty(item.fo_status)) {
              item.statusLabel = this.transCodingStatusValue[item.fo_status];
            } else {
              item.statusLabel = '실패';
            }
          });
        }
        this.filterContentsLists = this.contentsLists;
      })
      .then(() => {
        this.isContentsLoading = false;
      });
  }

  previewInit() {
    this.selectItems = [];
    this.originFileInfo = [];
    this.showPreview = false;
  }

  isShowPopup(e:boolean) {
    this.isShow = e;
  }

  changeItemStatus(action:string, mode:string) {
    if (mode === 'multi' && !this.selectItems.length) {
      this.popupType = 'message';
      this.popupMessage = '콘텐츠를 선택해주세요';
      this.isShow = true;
      return false;
    }
    this.changeStatusAction = action;
    this.changeStatusMode = mode;
    this.popupType = 'confirm';
    this.popupMessage = action === 'restart' ? '변환을 재시작 하시겠습니까?' : '삭제하시겠습니까?';
    this.isShow = true;
  }

  isConfirmation(e:boolean) {
    let newItemArray: any[] = [];
    if (this.selectItems.length && this.filterContentsLists && this.changeStatusMode === 'multi' && e) {
      console.log('multi');
      let itemObject: any = {};
      this.selectItems.forEach((item) => {
        itemObject = {};
        itemObject.fo_seq = item.fo_seq;
        newItemArray.push(itemObject);
      });
    } else if (this.changeStatusMode === 'single' && e) {
      console.log('single');
      newItemArray = [{ fo_seq: this.originFileInfo['fo_seq'] }];
    }

    if (this.changeStatusAction === 'restart') {
      this.contentsService.updateData(this.cmsApi.updateContentsStatus, newItemArray)
        .toPromise()
        .then(() => {
          this.selectItems = [];
          this.loadContent(this.selectGroup['gf_seq']);
        })
        .catch((error: any) => {
          console.log(error);
        });
    } else {
      this.contentsService.deleteData(this.cmsApi.updateContentsStatus, newItemArray)
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
  }

  showFolderForm() {
    if (Number(this.selectGroup['gf_level']) >= 8) {
      this.popupType = 'message';
      this.popupMessage = '폴더 추가는 8개까지 하실 수 있습니다.';
      this.isShow = true;
    } else {
      this.showAddFolderForm = true;
      if (this.selectGroup['gf_grp_seq']) { // 폴더인 경우
        this.folderFormInit(this.selectGroup['gf_grp_seq'], null, this.selectGroup['gf_seq'], String(Number(this.selectGroup['gf_level']) + 1));
      } else { // 그룹인 경우
        this.folderFormInit(this.selectGroup['grp_seq'], null, '0', '1');
      }
    }
  }

  folderFormInit(grpSeq:string, gfNm:string, gfPrntSeq:string, gfLevel:string) {
    this.folderForm.get('gf_grp_seq').setValue(grpSeq);
    this.folderForm.get('gf_nm').setValue(gfNm);
    this.folderForm.get('gf_prnt_seq').setValue(gfPrntSeq);
    this.folderForm.get('gf_level').setValue(gfLevel);
  }

  dupFolderName() {
    const inputFolderName: string = this.folderForm.value['gf_nm'];
    if (!!inputFolderName) {
      this.showFolderNameDupMsg = true;
      const url = this.cmsApi.checkDupFolderName + 'gf_grp_seq=' + this.folderForm.get('gf_grp_seq').value + '&gf_prnt_seq=' + this.folderForm.get('gf_prnt_seq').value + '&gf_nm=' + inputFolderName;
      this.contentsService.getLists(url)
        .toPromise()
        .then((res) => {
          this.ableFolderName = JSON.parse(res['_body']) === true;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  initDupFolderName() {
    this.showFolderNameDupMsg = false;
    this.ableFolderName = false;
  }

  addFolder(formObject: any) {
    this.contentsService.postData(this.cmsApi.postFolder, formObject)
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
    if (!this.searchKey || !this.filterContentsLists) {
      return false;
    }
    this.searchStatus = true;
    this.filterContentsLists = [];
    this.contentsLists.filter((item) => {
      if (this.searchKey && item.fo_nm && item.fo_nm.indexOf(this.searchKey) >= 0) {
        this.filterContentsLists.push(item);
      }
    });
  }

  resetFilter() {
    this.searchStatus = false;
    this.searchKey = '';
    this.filterContentsLists = this.contentsLists;
  }

  showInfo(item: any) {
    this.showPreview = true;
    this.isTcStatusLoading = true;
    this.isFileInfoLoading = true;
    this.originFileInfo = item;
    this.loadPreviewThumbnail(item);

    /*트랜스코딩 진행상황*/
    this.transCodingStatus = [];
    this.contentsService.getLists(this.cmsApi.loadItemTransCodingList + item.fo_seq)
      .toPromise()
      .then((cont) => {
        this.transCodingStatus = JSON.parse(cont['_body']);
        if (this.transCodingStatus) {
          this.transCodingStatus.forEach((item) => {
            if (this.transCodingStatusValue.hasOwnProperty(item.ft_status)) {
              item.statusLabel = this.transCodingStatusValue[item.ft_status];
            } else {
              item.statusLabel = '실패';
            }
          });
        }
      })
      .then(() => {
        this.isTcStatusLoading = false;
        this.isFileInfoLoading = false;
      });
  }

  loadPreviewThumbnail(item: any) {
    this.isThumbLoading = true;
    this.thumbPath = '';
    this.thumbPathArray = item['fo_thumb_path'].split('/');
    this.pvImg = document.getElementById('pvThumbnail');
    if (this.thumbPathArray[0] === '0') {
      this.pvImg.src = 'http://str.gomgxp.com/src/ci_gomc.jpg';
    } else if (this.thumbPathArray[1] !== 'gxthm') {
      this.thumbPathArray.pop();
      this.thumbPathArray.push(this.thumbPathArray[this.thumbPathArray.length - 1] + '0001.jpg');
      this.thumbPathArray.forEach((pathItem) => {
        this.thumbPath +=  pathItem + '/';
      });
      this.thumbPath = this.thumbPath.substring(0, this.thumbPath.length - 1);

      this.contentsService.getLists('http://' + this.thumbPath)
        .toPromise()
        .then(() => {
          this.pvImg.src = 'http://' + this.thumbPath;
        })
        .then(() => {
          this.isThumbLoading = false;
        })
        .catch(() => {
          this.pvImg.src = 'http://str.gomgxp.com/src/ci_gomc.jpg';
        });
    } else if (this.thumbPathArray[1] === 'gxthm') {
      this.thumbPathArray.pop();
      this.thumbPathArray.push('thumb-1000-w600-h390.jpg');
      this.thumbPathArray.forEach((pathItem) => {
        this.thumbPath +=  pathItem + '/';
      });
      this.thumbPath = this.thumbPath.substring(0, this.thumbPath.length - 1);
      this.pvImg.src = 'http://' + this.thumbPath;
    }
  }

  fileUpload(event: any, form:any) {
    this.setUploadHeader();
    this.setUploadData(event);
    this.showProgress();
    this.contentsService.uploadFile(this.ownPath, this.pathString, this.authKey, this.uploadFormData)
      .toPromise()
      .then(() => {
        this.progressPercent = 100;
        this.popupType = 'message';
        this.popupMessage = '파일 업로드가 완료되었습니다. \n목록 반영까지 1~3분 소요됩니다.';
        this.isShow = true;
        this.loadContent(this.selectGroup['gf_seq']);
        form.clear();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setUploadHeader() {
    this.groupList.forEach((item) => {
      if (this.selectGroup['gf_grp_seq'] === item['grp_seq']) {
        this.gid = item['grp_nm'];
      }
    });
    this.ownPath = '/' + this.cid + '/' + this.gid + '/';
    this.pathString = '/';
    this.pathArray.forEach((item) => {
      this.pathString += item + '/';
    });
  }

  setUploadData(userFile) {
    this.uploadFiles = userFile.files;
    for (let i = 0; i < this.uploadFiles.length; i += 1) {
      this.uploadFormData.append('file', this.uploadFiles[i]);
    }
  }

  showProgress() {
    const setTime:number = 500;

    this.progressPercent = 0;
    this.isUploading = true;
    setInterval(() => { this.createProgressValue(); }, setTime);
  }

  createProgressValue() {
    if (this.progressPercent < 50) {
      this.progressPercent += Math.floor(Math.random() * ((10 - 5) + 1) + 5); // 5-10 랜덤
    }
  }

  setUploadStyle() {
    const uploadContainer = document.getElementById('uploadDailog-container');
    uploadContainer.children[0].children[0].children[1].setAttribute('style', 'height: 250px; overflow-y: scroll;');
  }

  uploadInit() {
    this.uploadFiles = [];
  }

  refresh() {
    window.location.reload();
  }
}
