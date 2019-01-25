/**
 * Created by GRE511 on 2019-01-25.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../breadcrumb.service';

@Component({
  selector: 'encoding-tool',
  styleUrls: ['../developer-tool.component.css'],
  templateUrl: './encoding-tool.component.html'})

export class EncodingToolComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: '개발자도구', routerLink: ['/developer-tool/encoding'] },
      { label: '인코딩', routerLink: ['/developer-tool/encoding'] },
    ]);
  }

  ngOnInit() {
  }

  copyClipboard() {
    console.log('1');
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
