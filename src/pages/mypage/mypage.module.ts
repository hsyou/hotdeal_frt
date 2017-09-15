import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Mypage } from './mypage';

@NgModule({
  declarations: [
    Mypage,
  ],
  imports: [
    IonicPageModule.forChild(Mypage),
  ],
  exports: [
    Mypage
  ]
})
export class MypageModule {}
