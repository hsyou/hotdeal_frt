import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the QnaAPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-qna-a',
  templateUrl: 'qna-a.html',
})
export class QnaAPage {
  title:any;
  content:any;
  answer:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.title=this.navParams.get('title');
  this.content=this.navParams.get('content');
  this.answer=this.navParams.get('answer');
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad QnaAPage');
  }

}
