import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { NavController, IonicPage, NavParams, ViewController, AlertController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

import { Proceed_Detail } from '../proceed_detail/proceed_detail';
import { Proceed } from '../proceed/proceed';
import { ListPage } from '../list/list';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable, Subscription } from 'rxjs/Rx';
import * as $ from 'jquery';
import { Choice } from '../choice/choice';
/**
 * Generated class for the BuyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-buy',
  templateUrl: 'buy.html',
})
export class BuyPage {
  item_id: any;
  item_min_price: any;
  item_title: any;
  item_main_img: any;
  check = false;

  option_id: any;
  option_name: any;


  bid = { option_id: '', bid_price: '' };


  //입금자명,연락정보
  name: any;
  phone: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,
    elm: ElementRef, public viewCtrl: ViewController, public alertCtrl: AlertController,
    private auth: AuthService) {
    this.item_id = this.navParams.get('item_id');
    this.option_id = this.navParams.get('option_id');
    this.option_name = this.navParams.get('option_name');

    var url = 'http://www.fixme.kr/items/' + this.item_id;
    this.http.get(url).map(res => res.json()).subscribe(data => {
      this.item_min_price = data.item_min_price;
      this.item_title = data.item_title;
      this.item_main_img = data.item_main_img;
    }),
      err => {
        alert("서버와 연결에 실패했습니다.");
      }

  }

  ionViewDidLoad() {
  }


  //창닫기
  back() {
    this.viewCtrl.dismiss();
  }

  getAccount() {
    this.auth.getAccount().subscribe(data => {
      if (data) {
        this.name = data.account_holder;
        this.phone = data.account_number;
      } else {

      }
    })
  }


  //구매하기
  completeBuy(option_id, moneyChoice) {
    this.auth.getAccessToken().subscribe(success => {
      if (success) {
        this.check = true;
        //값이 있다. 로그인했다면
        let confirm = this.alertCtrl.create({
          title: '<낙찰 후 과정안내>',
          message: '1.제시하신 가격으로 낙찰이 확정 될 경우 확정되신 30분 중에서 가장 낮은 최저가로 가격이 책정됩니다.<br>'
          + '2.낙찰이 된 후 12시간 안에 결정된 비용을 입금해주시면 모든 과정 끝! 입금확인이 안될 경우 자동 취소가 됩니다.',
          buttons: [
            {
              text: '확인',
              handler: () => {
                //let info = this.auth.getUserInfo();
                let headers = new Headers();
                headers.append('Content-Type', 'application/json');

                this.bid.option_id = option_id;
                this.bid.bid_price = moneyChoice;
                // this.bid.user_id = info.email;

                var url = "http://www.fixme.kr/bid/?access_token=" + success;
                //let body="option_id="+option_id+"&bid_price="+moneyChoice+"&access_token="+success;
                //let body="bidding="+this.bid+ "&access_token="+success;
                this.http.post(url, this.bid, { headers: headers })
                  .subscribe(success => {
                    if (success) {
                      // 성공시
                      this.presentBuyAlert();
                      this.navCtrl.popAll();

                    } else {
                      // 실패시
                      //invalid_grant 아이디/비밀번호 오류
                      //invalid_token
                      this.presentError();
                    }
                  },
                  (error) => {
                    if (error.status == 406) {
                      //이미 구매한 상품일 경우
                      this.presentDuplicateAlert();
                    } else if (error.status == 401) {
                      //토큰값 기간 만료시
                      this.auth.changeToken();
                    }
                  });
              }
            },
            {
              text: '취소',
              handler: () => {
              }
            }
          ]
        });
        confirm.present();
      } else {
        //값이 없으면 로그인안한거
        this.presentLoginAlert();
        this.navCtrl.popAll();
      }
    }, error => {

    });

  }



  presentBuyAlert() {
    let alert = this.alertCtrl.create({
      title: '입찰완료',
      subTitle: '두근두근 최저가를 기대해주세요!',
      buttons: ['확인']
    });
    alert.present();
  }
  presentDuplicateAlert() {
    let alert = this.alertCtrl.create({
      title: '이미 구매한 상품입니다.',
      subTitle: '',
      buttons: ['확인']
    });
    alert.present();
  }
  presentLoginAlert() {
    let alert = this.alertCtrl.create({
      title: '로그인 후 이용가능합니다.',
      subTitle: '',
      buttons: ['확인']
    });
    alert.present();
  }
  presentError() {
    let alert = this.alertCtrl.create({
      title: 'Error 발생[1101]',
      subTitle: '지속적인 오류 발생시 관리자에게 문의해주세요',
      buttons: ['확인']
    });
    alert.present();
  }

}
