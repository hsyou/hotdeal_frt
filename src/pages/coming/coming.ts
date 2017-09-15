import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { NavController, NavParams,ModalController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { Proceed_Detail } from '../proceed_detail/proceed_detail';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable, Subscription } from 'rxjs/Rx';
import * as $ from 'jquery';
import {ComingDetailPage} from '../coming-detail/coming-detail';

@Component({
  selector: 'coming',
  templateUrl: 'coming.html'
})
export class Coming {
  proceed: {};

  constructor(public navCtrl: NavController,public modalCtrl: ModalController,
   public navParams: NavParams, public http: Http, elm: ElementRef) {
    //아이템 경로
    var url = 'http://www.fixme.kr/items/allcoming';
    this.http.get(url).map(res => res.json()).subscribe(data => {
      this.proceed = data;

    },
      err => {
        alert("서버와 연결에 실패했습니다.");
      }
    );
  }


  slideClick(item_id) {
    let theClickedIndex = this.slides.clickedIndex;
    this.modalCtrl.create(ComingDetailPage,{item_id:item_id}).present();
  }


  @ViewChild(Slides) slides: Slides;


}

