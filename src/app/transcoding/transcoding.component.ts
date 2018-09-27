import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'transcoding',
  templateUrl: './transcoding.component.html',
  styleUrls: ['./transcoding.component.css']})

export class TranscodingComponent implements OnInit {
  public params:Params;

  /*for path*/
  public pagePath = {
    standby: '변환 대기 모니터링',
    request: '변환 요청 모니터링',
    progress: '변환 진행 모니터링',
    complete: '변환 완료 모니터링',
    fail: '변환 실패 모니터링'};
  public pageName: string = '';

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.params = params;
      this.pageName = this.pagePath[this.params.id];

      this.lnbInit();
    });
  }

  lnbInit() {
    const lnb = document.getElementsByClassName('lnb-sec')[0].childNodes[0].childNodes;
    [].forEach.call(lnb, (item) => {
      if (item.getAttribute('id') === this.params['id']) {
        item.style.background = '#e9e9e9';
      } else {
        item.style.background = '#fff';
      }
    });
  }

  refresh() {
    window.location.reload();
  }
}
