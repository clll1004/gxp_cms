import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'group-mng',
    templateUrl: './group-mng.component.html',
    styleUrls: ['../../settings.component.css']
})

export class GroupMngComponent implements OnInit {
    @Input() groupData: any[];
    @Input() transOptions: any[] = [];

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
    ]

    public transOptionform: FormGroup;

    transUse: any[] = [
        {label:'사용여부', value:null},
        {label:'사용', value:true},
        {label:'사용안함', value:false}
    ];
    transFPS: any[] = [
        {label:'FPS', value:null},
        {label:'29.97', value:{id:1, name: '29.97', code: '29.97'}}
    ];

    constructor(private formBuilder: FormBuilder,private http: Http) { }

    ngOnInit() {
        this.transOptionform = this.formBuilder.group({
            'gto_seq': new FormControl(null),
            'gto_use_yn': new FormControl(null),
            'gto_file_suffix': new FormControl(null),
            'gto_frame_rate': new FormControl(null),
            'gto_video_bitrate': new FormControl(null),
            'gto_audio_bitrate': new FormControl(null),
            'gto_dst_width': new FormControl(null),
            'gto_dst_height': new FormControl(null),
        });
    }

    showForms() {

    }
}
