/**
 * Created by GRE511 on 2019-01-23.
 */
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'user-preset',
  templateUrl: './user-preset.component.html'})

export class UserPresetComponent implements OnInit {
  public tabMenuItems: MenuItem[];
  public params:Params;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.params = params;
    });

    this.tabMenuItems = [
      { label: '플레이어 프리셋', routerLink: ['/settings/user-preset/player'] },
      { label: '인코딩 프리셋', routerLink: ['/settings/user-preset/encoding/list'] },
      { label: '로고/워터마크 설정', routerLink: ['/settings/user-preset/etc'] },
    ];
  }
}
