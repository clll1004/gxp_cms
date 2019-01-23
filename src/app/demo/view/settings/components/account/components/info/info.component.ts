/**
 * Created by GRE511 on 2019-01-23.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../../../breadcrumb.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'info',
  styleUrls: ['../../../settings.component.css'],
  templateUrl: './info.component.html'})

export class InfoComponent implements OnInit {
  public agency:object = {
    name: '곰앤컴퍼니',
    charge: '김민',
    chargeEmail: 'user@gomcorp.com',
    chargePhone: '010-5222-5555',
  };
  public apiLicense:object = {
    domain: 'gomgxp.com',
    issueDate: '2018.10.24',
    terminationDate: '2018.10.24',
    keyValue: '7c1a8760xxxxxxxxxxxxxxxxxxxxxxxxxxx',
  };
  public passwordForm: FormGroup;

  constructor(private breadcrumbService: BreadcrumbService, private formBuilder: FormBuilder) {
    this.breadcrumbService.setItems([
      { label: '설정', routerLink: ['/settings/account/info'] },
      { label: '계정설정', routerLink: ['/settings/account/info'] },
      { label: '계정정보', routerLink: ['/settings/account/info'] },
    ]);
  }

  ngOnInit() {
    this.passwordForm = this.formBuilder.group({
      password: new FormControl(null),
      newPassword: new FormControl(null),
      newPasswordConfirm: new FormControl(null),
    });
  }

  onSubmit(value) {
    console.log(value);
  }

  copyClipboard() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = document.getElementById('keyCopy').innerText;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
