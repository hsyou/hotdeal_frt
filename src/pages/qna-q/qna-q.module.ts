import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QnaQPage } from './qna-q';

@NgModule({
  declarations: [
    QnaQPage,
  ],
  imports: [
    IonicPageModule.forChild(QnaQPage),
  ],
  exports: [
    QnaQPage
  ]
})
export class QnaQPageModule {}
