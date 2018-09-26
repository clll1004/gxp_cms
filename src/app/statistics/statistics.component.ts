/**
 * Created by GRE511 on 2018-08-21.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'statistics',
  templateUrl: './statistics.component.html'})

export class StatisticsComponent implements OnInit {
  public params:Params;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.params = params;

      this.lnbInit();
    });
  }

  lnbInit() {
    const lnb = document.getElementsByClassName('lnb-sec')[0].childNodes[0].childNodes;
    [].forEach.call(lnb, (item) => {
      if (item.getAttribute('class') === 'has-sub') {
        const next = item.nextSibling.childNodes;
        next.forEach((subItem) => {
          if (subItem.getAttribute('id') === this.params['sub-id']) {
            subItem.setAttribute('class', 'on');
          } else {
            subItem.setAttribute('class', '');
          }
        });
        if (item.getAttribute('id') === this.params['id']) {
          item.setAttribute('class', 'has-sub on');
          item.children[0].children[0].setAttribute('class', 'fas fa-angle-up');
        } else {
          item.setAttribute('class', 'has-sub');
          item.children[0].children[0].setAttribute('class', 'fas fa-angle-down');
        }
      }
    });
  }

  showSubLnb(e) {
    const target = e.currentTarget;
    const id = target.getAttribute('id');
    const temp:any[] = target.parentNode.children;
    const length = temp.length;

    for (let i = 0 ; i < length ; i += 1) {
      if (temp[i].getAttribute('class') === 'has-sub' || temp[i].getAttribute('class') === 'has-sub on') {
        temp[i].setAttribute('class', 'has-sub');
        temp[i].children[0].children[0].setAttribute('class', 'fas fa-angle-down');
      }
    }

    if (target.getAttribute('class') === 'has-sub') {
      target.setAttribute('class', 'has-sub on');
      target.children[0].children[0].setAttribute('class', 'fas fa-angle-up');
      [].forEach.call(target.nextSibling.children, (item) => {
        item.setAttribute('class', '');
      });
      target.nextSibling.children[0].setAttribute('class', 'on');
    } else if (target.getAttribute('class') === 'has-sub on') {
      target.setAttribute('class', 'has-sub');
      target.children[0].children[0].setAttribute('class', 'fas fa-angle-down');
    }
  }

  isSubOn(e) {
    const lnb = document.getElementsByClassName('lnb-sec')[0].childNodes[0].childNodes;
    [].forEach.call(lnb, (item) => {
      if (item.getAttribute('class') === 'sub-lnb') {
        item.childNodes.forEach((li) => {
          li.setAttribute('class', '');
        });
      }
    });
    const target = e.currentTarget;
    target.setAttribute('class', 'on');
  }
}

