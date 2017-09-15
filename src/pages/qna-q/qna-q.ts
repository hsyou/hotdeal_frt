import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the QnaQPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-qna-q',
  templateUrl: 'qna-q.html',
})
export class QnaQPage {
  title:any;
  content:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.title=this.navParams.get('title');
    this.content=this.navParams.get('content');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QnaQPage');
  }

}
