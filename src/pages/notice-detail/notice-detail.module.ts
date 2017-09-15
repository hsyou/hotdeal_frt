import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoticeDetailPage } from './notice-detail';

@NgModule({
  declarations: [
    NoticeDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(NoticeDetailPage),
  ],
  exports: [
    NoticeDetailPage
  ]
})
export class NoticeDetailPageModule {}
