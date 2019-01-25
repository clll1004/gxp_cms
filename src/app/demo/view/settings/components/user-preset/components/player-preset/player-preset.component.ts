/**
 * Created by GRE511 on 2019-01-25.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../../../breadcrumb.service';

@Component({
  selector: 'player-preset',
  styleUrls: ['./player-preset.component.css'],
  templateUrl: './player-preset.component.html'})

export class PlayerPresetComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: '설정', routerLink: ['/settings/account/info'] },
      { label: '프리셋 설정', routerLink: ['/settings/user-preset/player'] },
      { label: '플레이어 프리셋', routerLink: ['/settings/user-preset/player'] },
    ]);
  }

  ngOnInit() {
  }

  setPlayerPreset(e) {
    const target:HTMLElement = e.currentTarget;
    target.getAttribute('class') === 'presetLabel on' ? target.setAttribute('class', 'presetLabel') : target.setAttribute('class', 'presetLabel on');
  }
}
