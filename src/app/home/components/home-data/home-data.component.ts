import { Component, Input } from '@angular/core';

@Component({
    selector: 'home-data',
    templateUrl: './home-data.component.html',
    styleUrls: ['../../home.component.css']
})
export class HomeDataComponent {
    @Input() params:object;

    constructor() {
      // console.log('!!');
    }
}
