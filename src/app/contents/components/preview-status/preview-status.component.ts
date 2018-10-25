import { Component, Input, OnInit } from '@angular/core';
import { ContentsService } from '../../../services/apis/cms/contents/contents.service';
import { CmsApis } from '../../../services/apis/apis';

@Component({
  selector: 'preview-status',
  templateUrl: './preview-status.component.html',
  styleUrls: ['../contents.component.css']})

export class PreviewStatusComponent implements OnInit {
  @Input() transCodingStatus: object;
  @Input() folderPath: any;

  public transCodingItemInfo: any = {};
  public pvVideo:any;

  constructor(private contentsService: ContentsService, private cmsApi: CmsApis) { }

  ngOnInit() { }

  /*다이얼로그*/
  public display: boolean = false;

  showDialog(item:any) {
    this.display = true;

    this.contentsService.getLists(this.cmsApi.loadPreview + item.ft_seq)
      .toPromise()
      .then((cont) => {
        this.transCodingItemInfo = JSON.parse(cont['_body']);
        if (this.transCodingItemInfo['ft_status'] === 'U') {
          this.transCodingItemInfo['statusLabel'] = '업로드완료';
        } else if (this.transCodingItemInfo['ft_status'] === 'TR') {
          this.transCodingItemInfo['statusLabel'] = '변환요청';
        } else if (this.transCodingItemInfo['ft_status'] === 'TT') {
          this.transCodingItemInfo['statusLabel'] = '변환중';
        } else if (this.transCodingItemInfo['ft_status'] === 'TS') {
          this.transCodingItemInfo['statusLabel'] = '변환완료';
        } else if (this.transCodingItemInfo['ft_status'] === 'TF') {
          this.transCodingItemInfo['statusLabel'] = '변환실패';
        } else if (this.transCodingItemInfo['ft_status'] === 'SS') {
          this.transCodingItemInfo['statusLabel'] = '전송완료';
        } else if (this.transCodingItemInfo['ft_status'] === 'SF') {
          this.transCodingItemInfo['statusLabel'] = '전송실패';
        }

        this.pvVideo = document.getElementById('previewVideo');
        this.pvVideo.src = 'http://' + this.transCodingItemInfo['ft_svc_path'];
      })
      .catch((error) => { console.log(error); });
  }
}
