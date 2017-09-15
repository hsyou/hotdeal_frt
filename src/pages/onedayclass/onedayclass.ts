import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { Proceed_Detail } from '../proceed_detail/proceed_detail';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable, Subscription } from 'rxjs/Rx';
import * as $ from 'jquery';
@Component({
  selector: 'onedayclass',
  templateUrl: 'onedayclass.html',
})
export class OnedayClass {
proceed: {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, elm: ElementRef) {
    //아이템 경로
    var url = 'http://221.146.137.15:8080/items/allproceed';
    this.http.get(url).map(res => res.json()).subscribe(data => {
      this.proceed = data;

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


  slideClick(item_id) {
    let theClickedIndex = this.slides.clickedIndex;
    console.log('clicked on slide here', theClickedIndex);
    console.log("item_id : " + item_id);
  }


  @ViewChild(Slides) slides: Slides;


}

