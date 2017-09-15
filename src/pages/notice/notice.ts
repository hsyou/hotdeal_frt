import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as $ from 'jquery';
import {NoticeDetailPage} from '../notice-detail/notice-detail';
/**
 * Generated class for the NoticePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-notice',
  templateUrl: 'notice.html',
})
export class NoticePage {

  notice: {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController, private http: Http) {
    this.getNotice();
  }

  ionViewDidLoad() {
  }

  //공지사항 목록 불러오기
  getNotice() {
    let url = 'http://www.fixme.kr/notice/';
    this.http.get(url).map(res => res.json()).subscribe(data => {
      this.notice = data;
    },
      error => {

      })
  }
  
  //공지사항 상세보기
  getNotice_detail(notice_id){
    this.navCtrl.push(NoticeDetailPage,{notice_id :notice_id})
  }



}
