import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';
import { CustomValidators } from '../signup/customvalidators';
import * as $ from 'jquery';
import { UserSettingPage } from '../user-setting/user-setting';
import { QnaPage } from '../qna/qna';
import {MypageFixDetailPage} from '../mypage-fix-detail/mypage-fix-detail';
import {PaymentPage} from '../payment/payment';
/**
 * Generated class for the Mypage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-mypage',
  templateUrl: 'mypage.html',
})
export class Mypage {
  username = '';
  email = '';
  fix: string = "waiting";
  list: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService,
    public http: Http, private fb: FormBuilder, public alertCtrl: AlertController, ) {
    let info = this.auth.getUserInfo();
    this.username = info.getName();
    this.email = info.getEmail();


    this.auth.getAccessToken().subscribe(success => {
      if (success) {
        var url = "http://www.fixme.kr/bid/all?access_token=" + success;
        this.http.get(url).map(res => res.json()).subscribe(success => {
          if (success) {
            // 성공시
            this.list = success;
            //this.presentBid3Alert(success);
          } else {
            // 실패시
            this.presentAlert(success);
          }
        },
          error => {
            if(error.status==401){
              this.auth.changeToken();
            }
          });
      } else {
        //로그인 안했을 경우 
      }

    })
  }

  presentAlert(data) {
    let alert = this.alertCtrl.create({
      title: '연결 실패',
      subTitle: '접속환경을 확인하세요',
      buttons: ['확인']
    });
    alert.present();
  }
  presentBid3Alert(data) {
    let alert = this.alertCtrl.create({
      title: JSON.stringify(data),
      subTitle: '있는경우!',
      buttons: ['확인']
    });
    alert.present();
  }

  //계정설정가기
  user_setting() {
    this.navCtrl.push(UserSettingPage);
  }
  //결제설정가기
  user_payment(){
    this.navCtrl.push(PaymentPage);
  }
  //문의내역가기
  user_qna() {
    this.navCtrl.push(QnaPage);
  }

  //상세보기
  showDetail(item_id){
    this.navCtrl.push(MypageFixDetailPage,{item_id : item_id});
  }

}
