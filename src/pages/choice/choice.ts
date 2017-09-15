import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { Proceed_Detail } from '../proceed_detail/proceed_detail';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable, Subscription } from 'rxjs/Rx';
import * as $ from 'jquery';
import { BuyPage } from '../buy/buy';

@Component({
  selector: 'choice',
  templateUrl: 'choice.html'
})

export class Choice {
  item_id: any;
  item_title: any;
  optionVOList: any;

  constructor(
    public navCtrl: NavController, public navParams: NavParams, public http: Http,
    elm: ElementRef, public viewCtrl: ViewController) {
    this.item_id = this.navParams.get('item_id');

    var url = 'http://www.fixme.kr/items/' + this.item_id;
    this.http.get(url).map(res => res.json()).subscribe(data => {
      this.item_title = data.item_title;
      //console.log("option list : "+JSON.stringify(data));



      this.optionVOList = data.optionVOList;
      //console.log("optionVOlist"+this.optionVOList);
    },
      err => {
        //console.log("실패");
      }
    );
  }

  //창닫기
  back() {
    this.viewCtrl.dismiss();
  }

  //구매페이지로 이동
  goBuy(item_id, option_id, option_name) {
    this.navCtrl.push(BuyPage, {
      item_id: item_id,
      option_id: option_id,
      option_name: option_name,
    })
  }
}

