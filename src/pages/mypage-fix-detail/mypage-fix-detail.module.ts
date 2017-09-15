import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MypageFixDetailPage } from './mypage-fix-detail';

@NgModule({
  declarations: [
    MypageFixDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MypageFixDetailPage),
  ],
  exports: [
    MypageFixDetailPage
  ]
})
export class MypageFixDetailPageModule {}
