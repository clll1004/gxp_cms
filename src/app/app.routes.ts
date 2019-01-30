import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { DashboardDemoComponent } from './demo/view/dashboarddemo.component';
import { SampleDemoComponent } from './demo/view/sampledemo.component';
import { FormsDemoComponent } from './demo/view/formsdemo.component';
import { DataDemoComponent } from './demo/view/datademo.component';
import { PanelsDemoComponent } from './demo/view/panelsdemo.component';
import { OverlaysDemoComponent } from './demo/view/overlaysdemo.component';
import { MenusDemoComponent } from './demo/view/menusdemo.component';
import { MessagesDemoComponent } from './demo/view/messagesdemo.component';
import { MiscDemoComponent } from './demo/view/miscdemo.component';
import { EmptyDemoComponent } from './demo/view/emptydemo.component';
import { ChartsDemoComponent } from './demo/view/chartsdemo.component';
import { FileDemoComponent } from './demo/view/filedemo.component';
import { DocumentationComponent } from './demo/view/documentation.component';

import { StatisticsComponent } from './demo/view/statistics/components/statistics.component';
import { TransMonitoringComponent } from './demo/view/trans-monitoring/components/trans-monitoring.component';
import { MediaStorageComponent } from './demo/view/media-storage/components/media-storage.component';
import { PlayListComponent } from './demo/view/play-list/components/play-list.component';
import { InteractiveServiceComponent } from './demo/view/interactive-service/components/interactive-service.component';
import { SettingsComponent } from './demo/view/settings/components/settings.component';
import { DeveloperToolComponent } from './demo/view/developer-tool/components/developer-tool.component';
import { ContactUsComponent } from './demo/view/contact-us.component';
import { LoginComponent } from './demo/view/login/login.component';
import { NewPasswordComponent } from './demo/view/login/new-password.component';
import { NewPasswordCompleteComponent } from './demo/view/login/new-password-complete.component';
import { ResetPasswordComponent } from './demo/view/login/reset-password.component';
import { ExpirationComponent } from './demo/view/login/expiration.component';
import { NewAccountComponent } from './demo/view/login/new-account.component';
import { NewAccountCompleteComponent } from './demo/view/login/new-account-complete.component';
import { SAdminComponent } from './demo/view/sAdmin/components/sAdmin.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardDemoComponent },
    { path: 'media-storage/:id', component: MediaStorageComponent },
    { path: 'trans-monitoring', component: TransMonitoringComponent },
    { path: 'play-list', component: PlayListComponent },
    { path: 'statistics/:id', component: StatisticsComponent },
    { path: 'statistics/:id/:subId', component: StatisticsComponent },
    { path: 'interactive-service/:id', component: InteractiveServiceComponent },
    { path: 'interactive-service/:id/:subId', component: InteractiveServiceComponent },
    { path: 'interactive-service/:id/:subId/:detail', component: InteractiveServiceComponent },
    { path: 'settings/:id', component: SettingsComponent },
    { path: 'settings/:id/:subId', component: SettingsComponent },
    { path: 'settings/:id/:subId/:detail', component: SettingsComponent },
    { path: 'developer-tool/:id', component: DeveloperToolComponent },
    { path: 'contact-us', component: ContactUsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'new-password', component: NewPasswordComponent },
    { path: 'new-password-complete', component: NewPasswordCompleteComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'expiration', component: ExpirationComponent },
    { path: 'new-account', component: NewAccountComponent },
    { path: 'new-account-complete', component: NewAccountCompleteComponent },
    { path: 'admin/:id', component: SAdminComponent },
    { path: 'sample', component: SampleDemoComponent },
    { path: 'forms', component: FormsDemoComponent },
    { path: 'data', component: DataDemoComponent },
    { path: 'panels', component: PanelsDemoComponent },
    { path: 'overlays', component: OverlaysDemoComponent },
    { path: 'menus', component: MenusDemoComponent },
    { path: 'messages', component: MessagesDemoComponent },
    { path: 'misc', component: MiscDemoComponent },
    { path: 'empty', component: EmptyDemoComponent },
    { path: 'charts', component: ChartsDemoComponent },
    { path: 'file', component: FileDemoComponent },
    { path: 'documentation', component: DocumentationComponent }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'});
