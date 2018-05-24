import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from "@angular/router";

import '../assets/css/styles.css';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges, OnInit {
    public val: number;

    constructor(private router: Router) {
    }

    ngOnInit() {
        console.log(this.router.url);
    }

    ngOnChanges() {
        console.log('!');
        console.log(this.router.url);
    }
}

