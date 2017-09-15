import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdatehistoryPage } from './updatehistory';

@NgModule({
  declarations: [
    UpdatehistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdatehistoryPage),
  ],
  exports: [
    UpdatehistoryPage
  ]
})
export class UpdatehistoryPageModule {}
