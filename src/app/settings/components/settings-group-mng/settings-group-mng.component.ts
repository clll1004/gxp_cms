import { Component } from '@angular/core';

@Component({
    selector: 'settings-group-mng',
    templateUrl: './settings-group-mng.component.html',
    styleUrls: ['../../settings.component.css']
})
export class SettingsGroupMngComponent {
    cities: any[];
    selectedCity: any[];

    constructor() {
        this.cities = [
            {label:'Select City', value:null},
            {label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}},
            {label:'London', value:{id:3, name: 'London', code: 'LDN'}},
            {label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}},
            {label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}}
        ];
    }
}
