import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NoticePage } from '../notice/notice';
import { UpdatehistoryPage } from '../updatehistory/updatehistory'
import { HelpPeoplePage } from '../help-people/help-people';
/**
 * Generated class for the SetPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-set',
  templateUrl: 'set.html',
})
export class SetPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }
  //공지사항
  goNotice() {
    this.navCtrl.push(NoticePage);
  }
  goUpdateHistory() {
    this.navCtrl.push(UpdatehistoryPage);
  }
  //도움을 주신 분들
  goHelpPeople() {
    this.navCtrl.push(HelpPeoplePage);
  }

}
