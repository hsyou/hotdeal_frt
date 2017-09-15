import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindPwd } from './find_pwd';

@NgModule({
  declarations: [
    FindPwd,
  ],
  imports: [
    IonicPageModule.forChild(FindPwd),
  ],
  exports: [
    FindPwd
  ]
})
export class FindPwdModule {}
