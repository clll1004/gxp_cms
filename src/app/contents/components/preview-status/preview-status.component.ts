import { Component, Input, OnInit } from '@angular/core';
import { ContentsService } from '../../../services/apis/cms/contents/contents.service';
import { CmsApis } from '../../../services/apis/apis';

@Component({
    selector: 'preview-status',
    templateUrl: './preview-status.component.html',
    styleUrls: ['../../contents.component.css'],
    providers: [ ContentsService, CmsApis ]
})
export class PreviewStatusComponent implements OnInit {
    @Input() transcodingStatus: object;
    @Input() groupName:string;
    @Input() folderName:string;
    @Input() isShowDialogBtn:boolean;

    public transcodingItemInfo: any[] = [];
    public pvVideo:any;

    constructor(private contentsService: ContentsService, private cmsApis: CmsApis) { }

    ngOnInit() { }

    /*다이얼로그*/
    display: boolean = false;
    showDialog(item:any) {
      this.display = true;

      this.contentsService.getLists(this.cmsApis.loadPreview + item.ft_seq)
        .toPromise()
        .then((cont) => {
              this.transcodingItemInfo = JSON.parse(cont['_body']);
              if (this.transcodingItemInfo['ft_status'] == 'U') {
                  this.transcodingItemInfo['statusLabel'] = '업로드완료';
              } else if (this.transcodingItemInfo['ft_status'] == 'TR') {
                  this.transcodingItemInfo['statusLabel'] = '변환요청';
              } else if (this.transcodingItemInfo['ft_status'] == 'TT') {
                  this.transcodingItemInfo['statusLabel'] = '변환중';
              } else if (this.transcodingItemInfo['ft_status'] == 'TS') {
                  this.transcodingItemInfo['statusLabel'] = '변환완료';
              } else if (this.transcodingItemInfo['ft_status'] == 'TF') {
                  this.transcodingItemInfo['statusLabel'] = '변환실패';
              } else if (this.transcodingItemInfo['ft_status'] == 'SS') {
                  this.transcodingItemInfo['statusLabel'] = '전송완료';
              } else if (this.transcodingItemInfo['ft_status'] == 'SF') {
                  this.transcodingItemInfo['statusLabel'] = '전송실패';
              }

              this.pvVideo = document.getElementById('previewVideo');
              this.pvVideo.src = 'http://' + this.transcodingItemInfo['ft_svc_path'];
          })
        .catch((error) => {console.log(error)});
    }
}
