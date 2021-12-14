import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { TfNgCoreModule } from '@3t-transform/tf-ng-core';
import { TfNgNzModule } from '@3t-transform/tf-ng-nz';

// import { NzGridModule } from 'ng-zorro-antd/grid';

// import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
// import { NzButtonModule } from 'ng-zorro-antd/button';
// import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { MonitorComponent } from './pages/monitor/monitor.component';


import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzTreeModule } from 'ng-zorro-antd/tree';

import { environment } from '../environments/environment';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    WelcomeComponent,
    MonitorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TfNgCoreModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    // NzGridModule,

    // NzDropDownModule,
    // NzButtonModule,
    // NzToolTipModule

    NzLayoutModule,
    NzMenuModule,
    NzDrawerModule,
    NzGridModule,
		NzBreadCrumbModule,
		NzDividerModule,
		NzIconModule,
		NzFormModule,
		NzInputModule,
		NzAutocompleteModule,
    NzCheckboxModule,
    NzRadioModule,
    NzSwitchModule,
		NzDatePickerModule,
		NzSelectModule,
		NzUploadModule,
		NzButtonModule,
    NzDropDownModule,
    NzCalendarModule,
		NzListModule,
		NzTableModule,
		NzTabsModule,
		NzToolTipModule,
		NzCarouselModule,
		NzModalModule,
    NzMessageModule,
    NzEmptyModule,
    NzTreeModule,

    TfNgNzModule.forRoot({
      app:{
				title: 'Demo App',
				code: 'T',
				tenantApi: 'https://localhost:8500',
				environment: 0,
			},
			analytics: {
				key: environment.umamiKey,
				url: 'https://umami.uat.ontransform.com/umami.js',
			},
		})
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
