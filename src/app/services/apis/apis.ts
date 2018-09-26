/**
 * Created by GRE511 on 2018-07-26.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class CmsApis {
  public  domain = '';
  /**** 로그인 ****/
  public login = '';

  /**** CONTENTS ****/
  /* 폴더 */
  public loadFolderList = '';
  public checkDupFolderName = '';
  public postFolder = '';
  /* 콘텐츠 */
  public loadContentList = '';
  public loadItemTransCodingList = '';
  public loadPreview = '';
  public updateContentsStatus = '';

  /**** TRANSCODING ****/
  /* 변환 정보 */
  public loadTransCodingGroupNames = '';
  public loadStandbyList = '';
  public loadRequestList = '';
  public loadProgressList = '';
  public loadCompleteList = '';
  public loadFailList = '';
  public restartTransCoding = '';

  /**** SETTINGS ****/
  public loadGroupMng = '';
  public updateTransOption = '';
  public loadUserInfo = '';
  public updateUserInfo = '';
  public updatePassword = '';

  /**** Dashboard ****/
  public gxpDashboard = '';
  public storageDashboard = '';
  public dateDashboard = '';
  public timeDashboard = '';
  public contentsDashboard = '';
  public categoryDashboard = '';

  /**** Play Statistics ****/
  public byDateChart = '';
  public byDateTable = '';
  public byTimeChart = '';
  public byTimeTable = '';
  public byPlaySectionTable = '';
  public byPlaySectionChart = '';
  public byPlaySectionResultTable = '';
  public byPlayTimeTable = '';
  public byPlayTimeChart = '';
  public byPlayTimeResultTable = '';
  public byContentsChart = '';
  public byContentsTable = '';
  public byCategoryChart = '';
  public byCategoryTable = '';

  /**** Usage Analysis ****/
  public byStorageChart = '';
  public byStorageTable = '';

  /**** Player Preset ****/
  public playerPreset = '';

  constructor() {
    if (process.env.NODE_ENV === 'development') {
      this.domain = 'http://183.110.11.49/';
    } else if (process.env.NODE_ENV === 'production') {
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

    /**** Dashboard ****/
    this.gxpDashboard = this.domain + 'cms/dashboard/used';
    this.storageDashboard = this.domain + 'cms/dashboard/storage';
    this.dateDashboard = this.domain + 'cms/dashboard/playcntdate';
    this.timeDashboard = this.domain + 'cms/dashboard/playcnttime';
    this.contentsDashboard = this.domain + 'cms/dashboard/playcntcontent';
    this.categoryDashboard = this.domain + 'cms/dashboard/playcntcategory';

    /**** PlayStatistics ****/
    this.byDateChart = this.domain + 'cms/chart/playdatedata?';
    this.byDateTable = this.domain + 'cms/chart/playdatelist?';
    this.byTimeChart = this.domain + 'cms/chart/playtimedata?';
    this.byTimeTable = this.domain + 'cms/chart/playtimelist?';
    this.byPlaySectionTable = this.domain + 'cms/chart/playplaysectionlist?';
    this.byPlaySectionChart = this.domain + 'cms/chart/playplaysectiondata?';
    this.byPlaySectionResultTable = this.domain + 'cms/chart/playplaysectionlistdetail?';
    this.byPlayTimeTable = this.domain + 'cms/chart/playplaytimelist?';
    this.byPlayTimeChart = this.domain + 'cms/chart/playplaytimedata?';
    this.byPlayTimeResultTable = this.domain + 'cms/chart/playplaytimelistdetail?';
    this.byContentsChart = this.domain + 'cms/chart/playcontentdata?';
    this.byContentsTable = this.domain + 'cms/chart/playcontentlist?';
    this.byCategoryChart = this.domain + 'cms/chart/playcategorydata?';
    this.byCategoryTable = this.domain + 'cms/chart/playcategorylist?';

    /**** Usage Analysis ****/
    this.byStorageChart = this.domain + 'cms/chart/usedstoragedata?';
    this.byStorageTable = this.domain + 'cms/chart/usedstoragelist?';

    /**** Player Preset ****/
    this.playerPreset = this.domain + 'cms/setting/preset';
  }
}
