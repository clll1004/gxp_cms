/**
 * Created by GRE511 on 2019-01-16.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../../../../../breadcrumb.service';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { TwoWayService } from '../../../../../../../../../demo/service/twoway.service';

@Component({
  selector: 'manager-detail',
  styleUrls: ['../../../../../interactive-service.component.css'],
  templateUrl: './manager-detail.component.html'})

export class ManagerDetailComponent implements OnInit {
  public adAddForm:FormGroup;
  public adNameLength:string = '';
  public thumbSrc:string = '';
  public completeDialog:boolean = false;

  constructor(private breadcrumbService: BreadcrumbService, private formBuilder: FormBuilder, private twoWayService: TwoWayService) {
    this.breadcrumbService.setItems([
      { label: '양방향서비스', routerLink: ['/interactive-service/live-chat/list'] },
      { label: '실시간 광고 전송', routerLink: ['/interactive-service/ad-manage/manager/manager-list'] },
      { label: '광고 관리', routerLink: ['/interactive-service/ad-manage/manager/manager-list'] },
    ]);
  }

  ngOnInit() {
    const today = new Date();
    const month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1);
    const date = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
    const convertDate = `${today.getFullYear()}-${month}-${date} ${today.getHours()}:${today.getMinutes()}`;
    this.adAddForm = this.formBuilder.group({
      ad_nm: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(15)])),
      'fileToUpload[]': new FormControl(null),
      // created_at: new FormControl(convertDate),
      // updated_at: new FormControl(convertDate),
    });
  }

  onSubmit(value: any) {
    this.twoWayService.addAd(value)
      .then(() => {
        this.completeDialog = true;
      })
      .catch((error) => {
        console.log(error);
      })
  }

  loadTumbnail(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event:any) => { // called once readAsDataURL is completed
        this.thumbSrc = event.target.result;
      };
    }
  }

  closePopup() {
    this.completeDialog = false;
  }
}
