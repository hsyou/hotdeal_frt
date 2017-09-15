import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QnaAPage } from './qna-a';

@NgModule({
  declarations: [
    QnaAPage,
  ],
  imports: [
    IonicPageModule.forChild(QnaAPage),
  ],
  exports: [
    QnaAPage
  ]
})
export class QnaAPageModule {}
