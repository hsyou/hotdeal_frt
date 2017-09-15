import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpenLicensePage } from './open-license';

@NgModule({
  declarations: [
    OpenLicensePage,
  ],
  imports: [
    IonicPageModule.forChild(OpenLicensePage),
  ],
  exports: [
    OpenLicensePage
  ]
})
export class OpenLicensePageModule {}
