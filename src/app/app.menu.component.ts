import {Component, Input, OnInit} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {MenuItem} from 'primeng/primeng';
import {AppComponent} from './app.component';

@Component({
    selector: 'app-menu',
    template: `
        <ul app-submenu [item]="model" root="true" class="layout-menu"
            [reset]="reset" visible="true" parentActive="true"></ul>
    `
})
export class AppMenuComponent implements OnInit {
  @Input() reset: boolean;

  model: any[];

  constructor(public app: AppComponent) {}

  ngOnInit() {
    this.model = [
      { label: '대시보드', icon: 'fa fa-fw fa-home', routerLink: ['/'] },
      { label: '미디어보관함', icon: 'fas fa-fw fa-hdd', routerLink: ['/'] },
      { label: '변환 모니터링', icon: 'fa fa-fw fa-desktop', routerLink: ['/'] },
      { label: '재생목록', icon: 'fa fa-fw fa-list', routerLink: ['/'] },
      {
        label: '통계', icon: 'fa fa-fw fa-chart-pie' ,
        items: [
          { label: '재생통계', routerLink: ['/statistics/play-statistics/byDate'] },
          { label: '사용량분석', routerLink: ['/statistics/usage-analysis/#'] },
          { label: '방문자 통계', routerLink: ['/statistics/visitor-statistics'] },
          { label: '리포트', routerLink: ['/statistics/reporter'] },
        ],
      },
      {
        label: '양방향서비스', icon: 'fas fa-fw fa-exchange-alt',
        items: [
          { label: '라이브채팅', routerLink: ['/sample'] },
          { label: '라이브방송', routerLink: ['/sample'] },
          { label: '이벤트플레이어', routerLink: ['/sample'] },
          { label: '실시간 광고전송', routerLink: ['/sample'] },
          { label: '리모콘 연결관리', routerLink: ['/sample'] },
        ]
      },
      {
        label: '설정', icon: 'fa fa-fw fa-cog' ,
        items: [
          { label: '계정설정', routerLink: ['/sample'] },
          { label: '프리셋설정', routerLink: ['/sample'] },
        ]
      },
      {
        label: '개발자도구', icon: 'fa fa-fw fa-code',
        items: [
          { label: '인코딩', routerLink: ['/sample'] },
          { label: '플레이어', routerLink: ['/sample'] },
          { label: '분석', routerLink: ['/sample'] },
        ]
      },
    ];
  }
}

@Component({
  /* tslint:disable:component-selector */
  selector: '[app-submenu]',
  /* tslint:enable:component-selector */
  template: `
      <ng-template ngFor let-child let-i="index" [ngForOf]="(root ? item : item.items)">
          <li [ngClass]="{'active-menuitem': isActive(i)}" [class]="child.badgeStyleClass" *ngIf="child.visible === false ? false : true">
              <a [href]="child.url||'#'" (click)="itemClick($event,child,i)"
                 class="ripplelink" *ngIf="!child.routerLink"
                 [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target">
                  <i [ngClass]="child.icon"></i><span>{{child.label}}</span>
                  <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
                  <i class="fa fa-fw fa-angle-down layout-menuitem-toggler" *ngIf="child.items"></i>
              </a>

              <a (click)="itemClick($event,child,i)" class="ripplelink" *ngIf="child.routerLink"
                 [routerLink]="child.routerLink" routerLinkActive="active-menuitem-routerlink"
                 [routerLinkActiveOptions]="{exact: true}" [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target">
                  <i [ngClass]="child.icon"></i><span>{{child.label}}</span>
                  <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
                  <i class="fa fa-fw fa-angle-down layout-menuitem-toggler" *ngIf="child.items"></i>
              </a>
              <div class="submenu-arrow" *ngIf="child.items"></div>
              <ul app-submenu [item]="child" *ngIf="child.items" [visible]="isActive(i)" [reset]="reset" [parentActive]="isActive(i)"
                  [@children]=" isActive(i) ? 'visibleAnimated' : 'hiddenAnimated'"></ul>
          </li>
      </ng-template>
  `,
  animations: [
      trigger('children', [
          state('hiddenAnimated', style({
              height: '0px',
              opacity: 0
          })),
          state('visibleAnimated', style({
              height: '*',
              opacity: 1
          })),
          transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
          transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
      ])
  ]
})
export class AppSubMenuComponent {

  @Input() item: MenuItem;

  @Input() root: boolean;

  @Input() visible: boolean;

  _reset: boolean;

  _parentActive: boolean;

  activeIndex: number;

  constructor(public app: AppComponent) {}

  itemClick(event: Event, item: MenuItem, index: number) {

    // avoid processing disabled items
    if (item.disabled) {
      event.preventDefault();
      return true;
    }

    // activate current item and deactivate active sibling if any
    this.activeIndex = (this.activeIndex === index) ? null : index;

    // execute command
    if (item.command) {
      item.command({originalEvent: event, item: item});
    }

    // prevent hash change
    if (item.items || (!item.url && !item.routerLink)) {
      setTimeout(() => {
        this.app.layoutMenuScrollerViewChild.moveBar();
      }, 450);
      event.preventDefault();
    }

    // hide menu
    if (!item.items) {
      this.app.overlayMenuActive = false;
      this.app.staticMenuMobileActive = false;
    }
  }

  isActive(index: number): boolean {
    return this.activeIndex === index;
  }

  @Input() get reset(): boolean {
    return this._reset;
  }

  set reset(val: boolean) {
    this._reset = val;

    if (this._reset) {
      this.activeIndex = null;
    }
  }

  @Input() get parentActive(): boolean {
    return this._parentActive;
  }

  set parentActive(val: boolean) {
    this._parentActive = val;

    if (!this._parentActive) {
        this.activeIndex = null;
    }
  }
}
