/**
 * Created by GRE511 on 2019-01-29.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../../../../../breadcrumb.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'encoding-detail',
  styleUrls: ['../../encoding-preset.component.css'],
  templateUrl: './encoding-detail.component.html'})

export class EncodingDetailComponent implements OnInit {
  public addEncodingForm: FormGroup;
  public sizeOption:any[] = [{ label: '(변경안함)', value: '변경안함' }];
  public ratioOption:any[] = [{ label: '자동으로 확장', value: 'auto' }];
  public pixelOption:any[] = [{ label: '2048Kbps', value: '2048' }];
  public fileTypeOption:any[] = [{ label: 'MP4', value: 'mp4' }];
  public sampleOption:any[] = [{ label: '48000 Hz', value: '48000' }];
  public fileNameOption:any[] = [
    { label: '<원본파일명>. <기본확장자>', value: 'option0' },
    { label: '<원본파일명>. <날짜>. <기본확장자>', value: 'option1' },
    { label: '<원본파일명>. <트랙번호>. <기본확장자>', value: 'option2' },
    { label: '<원본파일명>. <날짜. 시간>. <기본확장자>', value: 'option3' },
    { label: 'M4V <카운터05>. <기본확장자>', value: 'option4' },
    { label: 'MAQ <카운터05>. <기본확장자>', value: 'option5' },
  ];

  constructor(private breadcrumbService: BreadcrumbService, private formBuilder: FormBuilder) {
    this.breadcrumbService.setItems([
      { label: '설정', routerLink: ['/settings/account/info'] },
      { label: '프리셋 설정', routerLink: ['/settings/user-preset/player'] },
      { label: '인코딩 프리셋', routerLink: ['/settings/user-preset/encoding/list'] },
    ]);
  }

  ngOnInit() {
    const today = new Date();
    const month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1);
    const date = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
    const convertDate = `${today.getFullYear()}-${month}-${date} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

    this.addEncodingForm = this.formBuilder.group({
      name: new FormControl(null),
      size: new FormControl('변경안함'),
      ratio: new FormControl('auto'),
      pixel: new FormControl('2048'),
      fileType: new FormControl('mp4'),
      sample: new FormControl('48000'),
      sampleOption: new FormControl('모노'),
      normal: new FormControl(false),
      normal_size: new FormControl(40),
      mute: new FormControl(false),
      fileNameRule: new FormControl('option0'),
      regDate: new FormControl(convertDate),
      updateDate: new FormControl(convertDate),
    });
  }

  onSubmit(value) {
    console.log(value);
  }
}
