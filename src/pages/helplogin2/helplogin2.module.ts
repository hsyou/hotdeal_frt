import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HelpLogin2 } from './helplogin2';

@NgModule({
  declarations: [
    HelpLogin2,
  ],
  imports: [
    IonicPageModule.forChild(HelpLogin2),
  ],
  exports: [
    HelpLogin2
  ]
})
export class HelpLogin2Module {}
