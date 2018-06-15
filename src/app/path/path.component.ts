import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";


@Component({
    selector: 'path',
    templateUrl: './path.component.html',
    styleUrls: ['./path.component.css']
})
export class PathComponent {
    @Input() params:object;
    public firstPath: string = '';
    public path: string = '';

    constructor(private router: Router) {
        this.firstPath = (this.router.url.substr(1)).toUpperCase();
        if(this.firstPath.search('/') > 0) {
            this.firstPath = this.firstPath.substr(0 , this.firstPath.search('/'));
        }

        // console.log(this.router.url.includes('transcoding-request'));
        console.log(this.params);

        if (this.router.url.includes('home')) {
            this.path = '대시보드';
        } else if (this.router.url.includes('contents')) {
            this.path = '콘텐츠';
        } else if (this.router.url.includes('transcoding-progress')) {
            this.path = '트랜스코딩 변환 진행 목록';
        } else if (this.router.url.includes('transcoding-request')) {
            this.path = '트랜스코딩 변환 요청 목록';
        }
        //else if (this.router.url == '/transcoding/transcoding-standby') {
        //     this.path = '트랜스코딩 변환 대기 목록';
        // }
    }
}
