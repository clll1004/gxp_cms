/**
 * Created by GRE511 on 2019-01-29.
 */
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../../../../../breadcrumb.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'encoding-list',
  styleUrls: ['../../encoding-preset.component.css'],
  templateUrl: './encoding-list.component.html'})

export class EncodingListComponent implements OnInit {
  public encodingForm: FormGroup;
  public sizeOption:any[] = [{ label: '(변경안함)', value: '변경안함' }];
  public ratioOption:any[] = [{ label: '자동으로 확장', value: 'auto' }];
  public pixelOption:any[] = [{ label: '2048Kbps', value: '2048' }];
  public fileTypeOption:any[] = [{ label: 'MP4', value: 'mp4' }];
  public sampleOption:any[] = [{ label: '48000 Hz', value: '48000' }];

  public encodingCols:any[] = [
    { header: '인코딩 타입', field: 'type' },
    { header: '화면 크기', field: 'size' },
    { header: '화질/용량', field: 'pixel' },
    { header: '오디오 설정', field: 'audio' },
    { header: '파일 형식', field: 'fileType' },
    { header: '등록일시', field: 'regDate' },
  ];
  public encodingRowData:any[] = [
    { type: '영상 편집용', size: '2048 x 1536', pixel: '2048', audio: '64', fileType: 'MP4', regDate: '2018-05-30' },
  ];
  public tempSelectItems:any[] = [];

  constructor(private breadcrumbService: BreadcrumbService, private formBuilder: FormBuilder) {
    this.breadcrumbService.setItems([
      { label: '설정', routerLink: ['/settings/account/info'] },
      { label: '프리셋 설정', routerLink: ['/settings/user-preset/player'] },
      { label: '인코딩 프리셋', routerLink: ['/settings/user-preset/encoding/list'] },
    ]);
  }

  ngOnInit() {
    this.encodingForm = this.formBuilder.group({
      size: new FormControl('변경안함'),
      ratio: new FormControl('auto'),
      pixel: new FormControl('2048'),
      fileType: new FormControl('mp4'),
      sample: new FormControl('48000'),
      sampleOption: new FormControl('모노'),
      normal: new FormControl(false),
      normal_size: new FormControl(40),
      mute: new FormControl(false),
    });
  }

  onSubmit(value) {
    console.log(value);
  }
}
