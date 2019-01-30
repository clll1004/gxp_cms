/**
 * Created by GRE511 on 2019-01-23.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';

import { SettingsComponent } from './components/settings.component';
import { AccountComponent } from './components/account/account.component';
import { InfoComponent } from './components/account/components/info/info.component';
import { AdminComponent } from './components/account/components/admin/admin.component';
import { ServiceManageComponent } from './components/account/components/service-manage/service-manage.component';
import { PaymentComponent } from './components/account/components/payment/payment.component';
import { UserPresetComponent } from './components/user-preset/user-preset.component';
import { PlayerPresetComponent } from './components/user-preset/components/player-preset/player-preset.component';
import { EncodingPresetComponent } from './components/user-preset/components/encoding-preset/encoding-preset.component';
import { EncodingListComponent } from './components/user-preset/components/encoding-preset/components/encoding-list/encoding-list.component';
import { EncodingDetailComponent } from './components/user-preset/components/encoding-preset/components/encoding-detail/encoding-detail.component';
import { LogoWatermarkComponent } from './components/user-preset/components/logo-watermark-preset/logo-watermark-preset.component';

import { TabMenuModule } from 'primeng/tabmenu';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ColorPickerModule } from 'primeng/colorpicker';

@NgModule({
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    TabMenuModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    PanelModule,
    TooltipModule,
    TableModule,
    DialogModule,
    CheckboxModule,
    RadioButtonModule,
    DropdownModule,
    SliderModule,
    InputSwitchModule,
    ColorPickerModule,
  ],
  exports: [SettingsComponent],
  declarations: [
    SettingsComponent,
    AccountComponent,
    InfoComponent,
    AdminComponent,
    ServiceManageComponent,
    PaymentComponent,
    UserPresetComponent,
    PlayerPresetComponent,
    EncodingPresetComponent,
    EncodingListComponent,
    EncodingDetailComponent,
    LogoWatermarkComponent,
  ]})

export class SettingsModule {
  constructor() { }
}
