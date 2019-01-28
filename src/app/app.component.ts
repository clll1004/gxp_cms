import {Component, AfterViewInit, ElementRef, Renderer2, ViewChild, OnDestroy, OnInit } from '@angular/core';
import {ScrollPanel} from 'primeng/primeng';
import { LoginService } from './demo/service/login.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {

  layoutMode = 'static';

  megaMenuMode = 'dark';

  menuMode = 'dark';

  profileMode = 'top';

  topbarMenuActive: boolean;

  overlayMenuActive: boolean;

  staticMenuDesktopInactive: boolean;

  staticMenuMobileActive: boolean;

  layoutMenuScroller: HTMLDivElement;

  menuClick: boolean;

  topbarItemClick: boolean;

  activeTopbarItem: any;

  resetMenu: boolean;

  rightPanelActive: boolean;

  rightPanelClick: boolean;

  megaMenuActive: boolean;

  megaMenuClick: boolean;

  @ViewChild('layoutMenuScroller') layoutMenuScrollerViewChild: ScrollPanel;

  public isLayoutShow: boolean = false;

  constructor(public renderer: Renderer2, private loginService: LoginService, private router: Router) {
    // document.cookie = 'usr_seq=11';
    // document.cookie = 'grp_seq=24';
  }

  ngOnInit() {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loginService.checkUserInfo(event.url);
        if (event.url === '/login' || event.url === '/new-password' || event.url === '/new-password-complete') {
          this.loginService.logout();
          this.isLayoutShow = false;
        } else {
          this.isLayoutShow = true;
        }
      }
    });
  }

  ngAfterViewInit() {
    if (this.isLayoutShow) {
      setTimeout(() => {this.layoutMenuScrollerViewChild.moveBar(); }, 100);
    }
  }

  onLayoutClick() {
    if (!this.topbarItemClick) {
      this.activeTopbarItem = null;
      this.topbarMenuActive = false;
    }

      if (!this.rightPanelClick) {
          this.rightPanelActive = false;
      }

      if (!this.megaMenuClick) {
          this.megaMenuActive = false;
      }

    if (!this.menuClick) {
      if (this.overlayMenuActive || this.staticMenuMobileActive) {
        this.hideOverlayMenu();
      }
    }

    this.topbarItemClick = false;
    this.menuClick = false;
      this.rightPanelClick = false;
      this.megaMenuClick = false;
  }

  onMenuButtonClick(event) {
    this.menuClick = true;
    this.topbarMenuActive = false;

    if (this.layoutMode === 'overlay') {
      this.overlayMenuActive = !this.overlayMenuActive;
    } else {
      if (this.isDesktop()) {
        this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive; } else {
        this.staticMenuMobileActive = !this.staticMenuMobileActive; }
    }

    event.preventDefault();
  }

  onMenuClick($event) {
    this.menuClick = true;
    this.resetMenu = false;
  }

  onTopbarMenuButtonClick(event) {
    this.topbarItemClick = true;
    this.topbarMenuActive = !this.topbarMenuActive;

    this.hideOverlayMenu();

    event.preventDefault();
  }

  onTopbarItemClick(event, item) {
    this.topbarItemClick = true;

    if (this.activeTopbarItem === item) {
      this.activeTopbarItem = null; } else {
      this.activeTopbarItem = item; }

    event.preventDefault();
  }

  onTopbarSubItemClick(event) {
    event.preventDefault();
  }

    onRightPanelButtonClick(event) {
        this.rightPanelClick = true;
        this.rightPanelActive = !this.rightPanelActive;
        event.preventDefault();
    }

    onRightPanelClick() {
        this.rightPanelClick = true;
    }

    onMegaMenuButtonClick(event) {
        this.megaMenuClick = true;
        this.megaMenuActive = !this.megaMenuActive;
        event.preventDefault();
    }

    onMegaMenuClick() {
        this.megaMenuClick = true;
    }

  hideOverlayMenu() {
    this.overlayMenuActive = false;
    this.staticMenuMobileActive = false;
  }

  isTablet() {
    const width = window.innerWidth;
    return width <= 1024 && width > 640;
  }

  isDesktop() {
    return window.innerWidth > 1024;
  }

  isMobile() {
    return window.innerWidth <= 640;
  }

  isOverlay() {
    return this.layoutMode === 'overlay';
  }
}
