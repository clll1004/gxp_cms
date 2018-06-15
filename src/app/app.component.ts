import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
import { Injectable } from "@angular/core";
import { Http } from '@angular/http';

import '../assets/css/styles.css';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent implements OnChanges, OnInit {
    public data: any;
    public isShow: boolean = true;

    constructor(private router: Router, http:Http) {
        this.data = http.get('http://183.110.11.49/adm/customer/list')
            .map(response => response.json());

        this.router.events.subscribe((event) => {
            if(event instanceof NavigationEnd) {
                // console.log(event.url);

                (event.url == '/login') ? this.isShow = false : this.isShow = true;
            }
        });

        /*쿠키 삭제시 로그아웃처리*/
        if(!(this.getCookie('userInfo'))) {
            this.router.navigate(['/', 'login']);
        }
    }

    ngOnInit() {
        // console.log(this.router);
    }

    ngOnChanges() {
        // console.log(this.router.url);
    }

    getCookie(name:string, isDecoding:boolean = false) {
        const data = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        const value = data? data[2] : null;

        return isDecoding ? atob(value) : value;
    }
}

