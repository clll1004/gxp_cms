/**
 * Created by GRE511 on 2019-01-25.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../../../breadcrumb.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'logo-watermark-preset',
  styleUrls: ['./logo-watermark-preset.component.css'],
  templateUrl: './logo-watermark-preset.component.html'})

export class LogoWatermarkComponent implements OnInit {
  public etcForm: FormGroup;
  public familyOption:any[] = [{ label: '맑은 고딕', value: '맑은 고딕' }];
  public sizeOption:any[] = [{ label: '8', value: '8' }];
  public position:any[] = ['top-left', 'top-center', 'top-right', 'middle-left', 'middle-center', 'middle-right', 'bottom-left', 'bottom-center', 'bottom-right'];

  constructor(private breadcrumbService: BreadcrumbService, private formBuilder: FormBuilder) {
    this.breadcrumbService.setItems([
      { label: '설정', routerLink: ['/settings/account/info'] },
      { label: '프리셋 설정', routerLink: ['/settings/user-preset/player'] },
      { label: '로고/워터마크 설정', routerLink: ['/settings/user-preset/logo-wartermark'] },
    ]);
  }

  ngOnInit() {
    this.etcForm = this.formBuilder.group({
      logoUse: new FormControl(false),
      logoSrc: new FormControl(null),
      logoPosition: new FormControl('middle-center'),
      logoOpacity: new FormControl(100),
      waterMarkUse: new FormControl(false),
      wmType: new FormControl('id'),
      wmTypeText: new FormControl(null),
      wmFontFamily: new FormControl('맑은 고딕'),
      wmFontSize: new FormControl('8'),
      wmFontColor: new FormControl('#ff6400'),
      wmPosition: new FormControl('middle-center'),
      wmOpacity: new FormControl(100),
    });
  }

  onSubmit(value) {
    console.log(value);
  }

  selectPosition(area, e) {
    const targetArea = area === 'logo' ? document.getElementById('logo_area_select') : document.getElementById('wm_area_select');
    const targetArr =  Array.from(targetArea.children);
    const target = e.currentTarget;

    for (const item of targetArr) {
      item.classList.remove('on');
    }
    target.classList.add('on');
    area === 'logo' ? this.etcForm.get('logoPosition').setValue(this.position[target.getAttribute('tabIndex')]) : this.etcForm.get('wmPosition').setValue(this.position[target.getAttribute('tabIndex')]);
  }
}
