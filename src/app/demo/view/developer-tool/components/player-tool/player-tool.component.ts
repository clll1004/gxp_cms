/**
 * Created by GRE511 on 2019-01-25.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../breadcrumb.service';

@Component({
  selector: 'player-tool',
  styleUrls: ['../developer-tool.component.css'],
  templateUrl: './player-tool.component.html'})

export class PlayerToolComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: '개발자도구', routerLink: ['/developer-tool/encoding'] },
      { label: '플레이어', routerLink: ['/developer-tool/player'] },
    ]);
  }

  ngOnInit() {
  }

  highlighting(e) {
    const tabSec = document.getElementById('tab');
    for (let i = 0 ; i < 3 ; i += 1) {
      tabSec.children[i].classList.remove('on');
    }
    const target = e.currentTarget;
    target.classList.add('on');
  }

  copyClipboard() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = document.getElementById('copyArea').innerText;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
