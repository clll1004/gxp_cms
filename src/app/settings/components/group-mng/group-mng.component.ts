import { Component, OnInit, Input } from '@angular/core';
import { Http, Headers } from "@angular/http";

@Component({
    selector: 'group-mng',
    templateUrl: './group-mng.component.html',
    styleUrls: ['../../settings.component.css']
})

export class GroupMngComponent implements OnInit {
    @Input() groupData: any[];
    @Input() transOptions: any[] = [];

    public fileSuffix:any;
    public videoBit:any;
    public audioBit:any;
    public dstWidth:any;
    public dstHeight:any;
    public selectedOption:any;

    public transOptionsCols: any[] = [
        {field: '', header: 'No', width: '5%'},
        {field: '', header: '옵션명', width: '10%'},
        {field: '', header: '사용여부', width: '10%'},
        {field: '', header: '파일접미어', width: '10%'},
        {field: '', header: 'FPS', width: '15%'},
        {field: '', header: '비디오비트율', width: '10%'},
        {field: '', header: '오디오비트율', width: '10%'},
        {field: '', header: '해상도(가로)', width: '10%'},
        {field: '', header: '해상도(세로)', width: '10%'},
        {field: '', header: '수정', width: '10%'},
    ];

    transUse: any[] = [
        {label:'사용여부', value:null},
        {label:'사용', value:true},
        {label:'사용안함', value:false}
    ];
    transFPS: any[] = [
        {label:'FPS', value:null},
        {label:'29.97', value:{id:1, name: '29.97', code: '29.97'}}
    ];

    constructor(private http: Http) { }

    ngOnInit() {

    }
    changeOption() {
        this.fileSuffix = document.getElementById('fileSuffix');
        this.videoBit = document.getElementById('videoBit');
        this.audioBit = document.getElementById('audioBit');
        this.dstWidth = document.getElementById('dstWidth');
        this.dstHeight = document.getElementById('dstHeight');

        let headers:Headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

        let newData:any = {};
        console.log(this.transOptions);
        newData['gto_seq'] = this.transOptions[0]['gto_seq'];
        newData['gto_use_yn'] = this.transOptions[0]['gto_use_yn'];
        newData['gto_file_suffix'] = this.fileSuffix.value;
        newData['gto_frame_rate'] = this.transOptions[0]['gto_frame_rate'];
        newData['gto_video_bitrate'] = this.videoBit.value;
        newData['gto_audio_bitrate'] = this.audioBit.value;
        newData['gto_dst_width'] = this.dstWidth.value;
        newData['gto_dst_height'] = this.dstHeight.value;

        return this.http.put('http://183.110.11.49/cms/setting/group/option', newData, { headers: headers })
          .toPromise()
          .then(() => {alert('수정완료되었습니다.');})
          .catch((error) => {
              console.log(error);
          });
    }
}
