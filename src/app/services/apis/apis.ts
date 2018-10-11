/**
 * Created by GRE511 on 2018-07-26.
 */
import { Injectable } from '@angular/core';
import { LoginService } from '../../login/login.service';

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

  /** search **/
  public loadCategoryKey = '';
  public searchStatistics = '';

  /**** Usage Analysis ****/
  public byStorageChart = '';
  public byStorageTable = '';
  public byGxpChart = '';
  public byGxpTable = '';

  /**** Player Preset ****/
  public playerPreset = '';

  constructor(private loginService: LoginService) {
    if (process.env.NODE_ENV === 'development') {
      this.domain = 'http://183.110.11.49/';
    } else if (process.env.NODE_ENV === 'production') {
      this.domain = 'http://183.110.11.49/';
    }
    const usrSeq = this.loginService.getCookie('usr_seq');

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
    this.gxpDashboard = this.domain + 'cms/dashboard/used?usr_seq=' + usrSeq;
    this.storageDashboard = this.domain + 'cms/dashboard/storage?usr_seq=' + usrSeq;
    this.dateDashboard = this.domain + 'cms/dashboard/playcntdate?usr_seq=' + usrSeq;
    this.timeDashboard = this.domain + 'cms/dashboard/playcnttime?usr_seq=' + usrSeq;
    this.contentsDashboard = this.domain + 'cms/dashboard/playcntcontent?usr_seq=' + usrSeq;
    this.categoryDashboard = this.domain + 'cms/dashboard/playcntcategory?usr_seq=' + usrSeq;

    /**** PlayStatistics ****/
    this.byDateChart = this.domain + 'cms/chart/playdatedata?usr_seq=' + usrSeq + '&';
    this.byDateTable = this.domain + 'cms/chart/playdatelist?usr_seq=' + usrSeq + '&';
    this.byTimeChart = this.domain + 'cms/chart/playtimedata?usr_seq=' + usrSeq + '&';
    this.byTimeTable = this.domain + 'cms/chart/playtimelist?usr_seq=' + usrSeq + '&';
    this.byPlaySectionTable = this.domain + 'cms/chart/playplaysectionlist?usr_seq=' + usrSeq + '&';
    this.byPlaySectionChart = this.domain + 'cms/chart/playplaysectiondata?usr_seq=' + usrSeq + '&';
    this.byPlaySectionResultTable = this.domain + 'cms/chart/playplaysectionlistdetail?usr_seq=' + usrSeq + '&';
    this.byPlayTimeTable = this.domain + 'cms/chart/playplaytimelist?usr_seq=' + usrSeq + '&';
    this.byPlayTimeChart = this.domain + 'cms/chart/playplaytimedata?usr_seq=' + usrSeq + '&';
    this.byPlayTimeResultTable = this.domain + 'cms/chart/playplaytimelistdetail?usr_seq=' + usrSeq + '&';
    this.byContentsChart = this.domain + 'cms/chart/playcontentdata?usr_seq=' + usrSeq + '&';
    this.byContentsTable = this.domain + 'cms/chart/playcontentlist?usr_seq=' + usrSeq + '&';
    this.byCategoryChart = this.domain + 'cms/chart/playcategorydata?usr_seq=' + usrSeq + '&';
    this.byCategoryTable = this.domain + 'cms/chart/playcategorylist?usr_seq=' + usrSeq + '&';

    /** search **/
    this.loadCategoryKey = this.domain + 'cms/setting/user/category/';

    /**** Usage Analysis ****/
    this.byStorageChart = this.domain + 'cms/chart/usedstoragedata?usr_seq=' + usrSeq + '&';
    this.byStorageTable = this.domain + 'cms/chart/usedstoragelist?usr_seq=' + usrSeq + '&';
    this.byGxpChart = this.domain + 'cms/chart/useddata?usr_seq=' + usrSeq + '&';
    this.byGxpTable = this.domain + 'cms/chart/usedlist?usr_seq=' + usrSeq + '&';

    /**** Player Preset ****/
    this.playerPreset = this.domain + 'cms/setting/preset';
  }
}
