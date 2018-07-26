/**
 * Created by GRE511 on 2018-07-26.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class CmsApis {
  public ip = 'http://183.110.11.49/';

  /**** 로그인 ****/
  public login = this.ip + 'cms/login';

  /**** CONTENTS ****/
  /* 폴더 */
  public loadFolderList = this.ip + 'cms/folder/list/';
  public postFolder = this.ip + 'cms/folder';
  /* 콘텐츠 */
  public loadContentList = this.ip + 'cms/contents/list?page=1&row=10000&gf_seq=';
  public loadItemTranscodingList = this.ip + 'cms/contents/list/tcd/';
  public loadPreview = this.ip + 'cms/contents/preview/';
  public restartContentsTranscoding = this.ip + 'cms/contents';

  /**** TRANSCODING ****/
  /* 변환 정보 */
  public loadTranscodingGroupNames = this.ip + 'cms/transcoding/list/group/';
  public loadStandbyList = this.ip + 'cms/transcoding/list?page=1&row=1000&ft_status=U&grp_seq=';
  public loadRequestList = this.ip + 'cms/transcoding/list?page=1&row=1000&ft_status=TR&grp_seq=';
  public loadProgressList = this.ip + 'cms/transcoding/list?page=1&row=1000&ft_status=TT&grp_seq=';
  public loadCompleteList = this.ip + 'cms/transcoding/list?page=1&row=1000&ft_status=TS&grp_seq=';
  public loadFailList = this.ip + 'cms/transcoding/list?page=1&row=1000&ft_status=TF&grp_seq=';
  public restartTranscoding = this.ip + 'cms/transcoding';

  /**** SETTINGS ****/
  public loadGroupMng = this.ip + 'cms/setting/group/';
  public updateTransOption = this.ip + 'cms/setting/group/option';
  public loadUserInfo = this.ip + 'cms/setting/user/';
  public updateUserInfo = this.ip + 'cms/setting/user';
  public updatePassword = this.ip + 'cms/setting/user/password';

  constructor() {}
}