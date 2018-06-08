import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from "@angular/router";
import {Injectable} from "@angular/core";
import { Http } from '@angular/http';

import '../assets/css/styles.css';


@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent implements OnChanges, OnInit {
    public val: number;
    public data: any;

    constructor(private router: Router, http:Http) {
        this.data = http.get('http://183.110.11.49/adm/customer/list')
            .map(response => response.json());
    }

    ngOnInit() {
        console.log(this.router.url);
    }

    ngOnChanges() {
        console.log('!');
        console.log(this.router.url);
    }
}

