/**
 * Created by GRE511 on 2018-07-26.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class CmsApis {
  public  domain = '';
  /**** 로그인 ****/
  public login = this.domain + 'cms/login';

  /**** CONTENTS ****/
  /* 폴더 */
  public loadFolderList = this.domain + 'cms/folder/list/';
  public checkDupFolderName = this.domain + '/cms/folder/check?';
  public postFolder = this.domain + 'cms/folder';
  /* 콘텐츠 */
  public loadContentList = this.domain + 'cms/contents/list?page=1&row=10000&gf_seq=';
  public loadItemTransCodingList = this.domain + 'cms/contents/list/tcd/';
  public loadPreview = this.domain + 'cms/contents/preview/';
  public updateContentsStatus = this.domain + 'cms/contents';

  /**** TRANSCODING ****/
  /* 변환 정보 */
  public loadTransCodingGroupNames = this.domain + 'cms/transcoding/list/group/';
  public loadStandbyList = this.domain + 'cms/transcoding/list?page=1&row=1000&ft_status=U&grp_seq=';
  public loadRequestList = this.domain + 'cms/transcoding/list?page=1&row=1000&ft_status=TR&grp_seq=';
  public loadProgressList = this.domain + 'cms/transcoding/list?page=1&row=1000&ft_status=TT&grp_seq=';
  public loadCompleteList = this.domain + 'cms/transcoding/list?page=1&row=1000&ft_status=SS&grp_seq=';
  public loadFailList = this.domain + 'cms/transcoding/list?page=1&row=1000&ft_status=TF&grp_seq=';
  public restartTransCoding = this.domain + 'cms/transcoding';

  /**** SETTINGS ****/
  public loadGroupMng = this.domain + 'cms/setting/group/';
  public updateTransOption = this.domain + 'cms/setting/group/option';
  public loadUserInfo = this.domain + 'cms/setting/user/';
  public updateUserInfo = this.domain + 'cms/setting/user';
  public updatePassword = this.domain + 'cms/setting/user/password';

  constructor() {
    if (process.env.NODE_ENV === 'development') {
      console.log(process.env.NODE_ENV);
      this.domain = 'http://183.110.11.49/';
    } else if (process.env.NODE_ENV === 'production') {
      console.log(process.env.NODE_ENV);
      this.domain = 'http://183.110.11.49/';
    }

    /**** 로그인 ****/
    this.login = this.domain + 'cms/login';

    /**** CONTENTS ****/
    /* 폴더 */
    this.loadFolderList = this.domain + 'cms/folder/list/';
    this.checkDupFolderName = this.domain + '/cms/folder/check?';
    this.postFolder = this.domain + 'cms/folder';
    /* 콘텐츠 */
    this.loadContentList = this.domain + 'cms/contents/list?page=1&row=10000&gf_seq=';
    this.loadItemTransCodingList = this.domain + 'cms/contents/list/tcd/';
    this.loadPreview = this.domain + 'cms/contents/preview/';
    this.updateContentsStatus = this.domain + 'cms/contents';

    /**** TRANSCODING ****/
    /* 변환 정보 */
    this.loadTransCodingGroupNames = this.domain + 'cms/transcoding/list/group/';
    this.loadStandbyList = this.domain + 'cms/transcoding/list?page=1&row=1000&ft_status=U&grp_seq=';
    this.loadRequestList = this.domain + 'cms/transcoding/list?page=1&row=1000&ft_status=TR&grp_seq=';
    this.loadProgressList = this.domain + 'cms/transcoding/list?page=1&row=1000&ft_status=TT&grp_seq=';
    this.loadCompleteList = this.domain + 'cms/transcoding/list?page=1&row=1000&ft_status=SS&grp_seq=';
    this.loadFailList = this.domain + 'cms/transcoding/list?page=1&row=1000&ft_status=TF&grp_seq=';
    this.restartTransCoding = this.domain + 'cms/transcoding';

    /**** SETTINGS ****/
    this.loadGroupMng = this.domain + 'cms/setting/group/';
    this.updateTransOption = this.domain + 'cms/setting/group/option';
    this.loadUserInfo = this.domain + 'cms/setting/user/';
    this.updateUserInfo = this.domain + 'cms/setting/user';
    this.updatePassword = this.domain + 'cms/setting/user/password';
  }
}
