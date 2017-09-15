import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComingDetailPage } from './coming-detail';

@NgModule({
  declarations: [
    ComingDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ComingDetailPage),
  ],
  exports: [
    ComingDetailPage
  ]
})
export class ComingDetailPageModule {}
