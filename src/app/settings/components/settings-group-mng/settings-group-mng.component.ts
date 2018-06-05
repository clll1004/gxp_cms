import { Component } from '@angular/core';

interface City {
    name: string;
    code: string;
}


@Component({
    selector: 'settings-group-mng',
    templateUrl: './settings-group-mng.component.html',
    styleUrls: ['../../settings.component.css']
})
export class SettingsGroupMngComponent {
    cities: City[];
    selectedCity: City;

    constructor() {
        console.log('!!');
        this.cities = [
            {name: 'New York', code: 'NY'},
            {name: 'Rome', code: 'RM'},
            {name: 'London', code: 'LDN'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Paris', code: 'PRS'}
        ];
    }
}
