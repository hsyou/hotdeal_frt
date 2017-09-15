import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Helplogin2 page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-helplogin2',
  templateUrl: 'helplogin2.html',
})
export class HelpLogin2 {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goHome(){
    this.navCtrl.popToRoot();
  }

}
