import {Component, Input} from '@angular/core';

@Component({
    selector: 'transcoding-wrap',
    templateUrl: './transcoding-wrap.component.html',
    styleUrls: ['../../transcoding.component.css', './transcoding-wrap.component.css']
})
export class TranscodingWrapComponent {
    @Input() params:object;

    /*for dropdown*/
    cgroups: any[];
    selectedGroup: any[];
    rowcount: any[];
    selectedRow: any[];

    /*for table*/
    transProgress: any[];
    transRequest: any[];
    transStandby: any[];
    transComplete: any[];
    transFail: any[];

    ngOnInit() {
        this.transProgress
    }

    constructor() {
        this.cgroups = [
            {label:'전체', value:'all'},
            {label:'GOM', value:'GOM'},
            {label:'GVA', value:'GVA'}
        ];

        this.rowcount = [
            {label:'선택', value:null},
            {label:'20', value:20},
            {label:'40', value:40},
            {label:'60', value:60}
        ]
    }
}
