import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindId } from './find_id';

@NgModule({
  declarations: [
    FindId,
  ],
  imports: [
    IonicPageModule.forChild(FindId),
  ],
  exports: [
    FindId
  ]
})
export class FindIdModule {}
