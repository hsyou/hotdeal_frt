import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

/**
 * Generated class for the MypageFixDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-mypage-fix-detail',
  templateUrl: 'mypage-fix-detail.html',
})
export class MypageFixDetailPage {
  item_id:any;
  item_main_img: any;
  item_sub_img: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http) {
    this.item_id=this.navParams.get('item_id');

    var url = 'http://www.fixme.kr/items/' + this.item_id;
    this.http.get(url).map(res => res.json()).subscribe(data => {
      this.item_main_img = data.item_main_img;
      this.item_sub_img = data.item_sub_img;
    },
      err => {
        console.log("실패");
      }
    );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MypageFixDetailPage');
  }

}
