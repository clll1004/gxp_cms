import { Component } from '@angular/core';

@Component({
    selector: 'group-mng',
    templateUrl: './group-mng.component.html',
    styleUrls: ['../../settings.component.css']
})


export class GroupMngComponent {
    transUse: any[];
    transFPS: any[];
    selectedOption: any[];
    selectedOption2: any[];
    selectedFPSOption: any[];
    selectedFPSOption2: any[];

    constructor() {
        this.transUse = [
            {label:'사용여부', value:null},
            {label:'사용', value:true},
            {label:'사용안함', value:false}
        ];
        this.transFPS = [
            {label:'FPS', value:null},
            {label:'29.97', value:{id:1, name: '29.97', code: '29.97'}}
        ];
    }
}
