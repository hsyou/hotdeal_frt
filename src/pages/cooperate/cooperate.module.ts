import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CooperatePage } from './cooperate';

@NgModule({
  declarations: [
    CooperatePage,
  ],
  imports: [
    IonicPageModule.forChild(CooperatePage),
  ],
  exports: [
    CooperatePage
  ]
})
export class CooperatePageModule {}
