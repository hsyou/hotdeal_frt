import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
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

@Component({
  selector: 'bid',
  templateUrl: 'bid.html'
})
export class Bid {
  item_id: any;
  item_max_price: any;
  item_min_price: any;
  item_end_date: any;
  item_title: any;

  option_id: any;
  option_name: any;


  bid = { option_id: '', bid_price: '' };

  //가격조정
  moneyChoice: string = "0";
  constructor(
    public navCtrl: NavController, public navParams: NavParams, public http: Http,
    elm: ElementRef, public viewCtrl: ViewController, public alertCtrl: AlertController,
    private auth: AuthService) {
    this.item_id = this.navParams.get('item_id');
    this.option_id = this.navParams.get('option_id');
    this.option_name = this.navParams.get('option_name');
    console.log("item id : " + this.item_id + " option_id : " + this.option_id + "option_name : "
      + this.option_name);

    var url = 'http://www.fixme.kr/items/' + this.item_id;
    this.http.get(url).map(res => res.json()).subscribe(data => {
      this.item_max_price = data.item_max_price;
      this.item_min_price = data.item_min_price;
      this.item_end_date = data.item_end_date;
      this.item_title = data.item_title;

      Observable.interval(1000).map((x) => {

        //남은 시간 뿌리기
        $('.item_end_date').each(function (index, value) {

          var remain = Math.floor(($(this).text() - new Date().getTime()) / 1000);

          var days;
          days = Math.floor(remain / 86400);

          var days2, hours;
          days2 = Math.floor(remain / 86400);
          remain -= days2 * 86400;
          hours = Math.floor(remain / 3600) % 24;

          var days3, hours2, minutes;
          days3 = Math.floor(remain / 86400);
          remain -= days3 * 86400;
          hours2 = Math.floor(remain / 3600) % 24;
          remain -= hours * 3600;
          minutes = Math.floor(remain / 60) % 60;

          var days4, hours3, minutes2, seconds;
          days4 = Math.floor(remain / 86400);
          remain -= days4 * 86400;
          hours3 = Math.floor(remain / 3600) % 24;
          remain -= hours3 * 3600;
          minutes2 = Math.floor(remain / 60) % 60;
          remain -= minutes2 * 60;
          seconds = remain % 60;

          //남은시간 텍스트
          $(this).siblings(".text").text(days + "일 " + hours + "시간 " + minutes + "분 " + seconds + "초");

        });
      }).subscribe((x) => {
      });
    },
      err => {
        alert("서버와 연결에 실패했습니다.");
      }
    );


  }
  comma(num) {
    console.log("콤마 실행");
    var len, point, str;

    num = num + "";
    point = num.length % 3;
    len = num.length;

    str = num.substring(0, point);
    while (point < len) {
      if (str != "") str += ",";
      str += this.moneyChoice.substring(point, point + 3);
      point += 3;
    }
    this.moneyChoice = str;
    console.log("실행 후  : " + this.moneyChoice)
  }



  //창닫기
  back() {
    this.viewCtrl.dismiss();
  }
  completeBid(option_id, moneyChoice) {
    this.auth.getAccessToken().subscribe(success => {
      if (success) {
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
                      this.presentBidAlert();
                      this.navCtrl.popAll();
                    } else {
                      // 실패시
                      this.presentError();
                    }
                  },
                  error => {
                    //이미 구매한 상품일 경우
                    this.presentDuplicateAlert();
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
  presentBidAlert() {
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
      subTitle: '지속적인 오류 발생시 개발자에게 문의해주세요',
      buttons: ['확인']
    });
    alert.present();
  }

}
