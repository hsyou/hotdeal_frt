import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
/**
 * Generated class for the NoticeDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-notice-detail',
  templateUrl: 'notice-detail.html',
})
export class NoticeDetailPage {
  notice_id:any;
  notice_title:any;
  notice_content:any;

  constructor(public navCtrl: NavController,private alertCtrl: AlertController,
   public navParams: NavParams, private http: Http) {
    this.notice_id=this.navParams.get('notice_id');
    this.getNotice_detail(this.notice_id);
  }

  ionViewDidLoad() {
  }

  getNotice_detail(notice_id){
    let url = 'http://www.fixme.kr/notice/'+notice_id;
    this.http.get(url).map(res => res.json()).subscribe(data => {
      this.notice_title=data.notice_title;
      this.notice_content=data.notice_content;
      //this.presentcert(JSON.stringify(data));
    },
      error => {

      })
  }
  presentcert(data) {
    let alert = this.alertCtrl.create({
      title: data + '로딩성공',
      subTitle: '성공',
      buttons: ['확인']
    });
    alert.present();
  }

}
