/**
 * Created by GRE511 on 2019-01-08.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../breadcrumb.service';

@Component({
  selector: 'storage-detail',
  styleUrls: ['../media-storage.component.css'],
  templateUrl: './storage-detail.component.html'})

export class StorageDetailComponent implements OnInit {
  public storageList:any = [{ label: '전체', value: 'all' }, { label: '광고전송', value: 'transmitAd' }, { label: '스킨변경', value: 'changeSkin' }];
  public selectedStorage: any = 'all';

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: '미디어보관함', routerLink: ['/media-storage'] },
    ]);
  }

  ngOnInit() {
  }
}