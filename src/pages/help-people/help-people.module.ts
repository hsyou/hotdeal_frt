import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HelpPeoplePage } from './help-people';

@NgModule({
  declarations: [
    HelpPeoplePage,
  ],
  imports: [
    IonicPageModule.forChild(HelpPeoplePage),
  ],
  exports: [
    HelpPeoplePage
  ]
})
export class HelpPeoplePageModule {}
