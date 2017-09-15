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

@Component({
  selector: 'proceed',
  templateUrl: 'proceed.html',
})
export class Proceed
//implements OnInit, OnDestroy 
{
  proceed: any;
  result=0;

  /*  private eventDate: Date = new Date("2017-05-03 19:51:51");
  
    private futureString: string;
    private diff: number;
    private countDownResult: number;
    private days: number;
    private hours: number;
    private minutes: number;
    private seconds: number;
    private text: string;
  */

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, elm: ElementRef,
  public modalCtrl: ModalController) {
    //아이템 경로
    var url = 'http://www.fixme.kr/items/allproceed';
    this.http.get(url).map(res => res.json()).subscribe(data => {
      this.proceed = data;
      this.result=data.length;
      //console.log("result : "+this.result );
      

      //json에서 마감시간 가져오기
      /*$(this.proceed).each(function (index, item) {
        this.futureString = item.item_end_date;
        console.log("futureString : " + this.futureString + " index : " + index);

        for (let i = 0; i < index; i++) {
          this.futureString = new Date(item.item_end_date);
          item.item_start_date = this.futuerString;
        }
      });*/

      Observable.interval(1000).map((x) => {
        /* console.log("id 시간 : " + $("#item_end_date").text());
         console.log("eventDate : " + this.eventDate);
         console.log("eventDate : " + this.eventDate.getTime());*/

        //this.diff = Math.floor((this.eventDate.getTime() - new Date().getTime()) / 1000);

        //남은 시간 뿌리기
        $('.item_end_date').each(function (index, value) {

          var remain = Math.floor(($(this).text() - new Date().getTime()) / 1000);
          // console.log("remain : " + remain);
          // console.log("this val : " + index + " " + $(this).text());
          // console.log("time : " + new Date().getTime());

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

        /*  this.days = this.getDays(this.diff);
          this.hours = this.getHours(this.diff);
          this.minutes = this.getMinutes(this.diff);
          this.seconds = this.getSeconds(this.diff);
          this.text = this.days + "일 " + this.hours + "시간 " + this.minutes + "분 " + this.seconds + "초 ";
          */

      });


      //  데이터 전부 뿌리기
      //  console.log("data : " + JSON.stringify(data));
    },
      err => {
        alert("서버와 연결에 실패했습니다.");
      }
    );
    // this.futureString = elm.nativeElement.getAttribute('inputDate');
  }


  slideClick(item_id) {
    let theClickedIndex = this.slides.clickedIndex;
    // console.log('clicked on slide here', theClickedIndex);
    // console.log("item_id : " + item_id);
    this.modalCtrl.create(Proceed_Detail, {item_id: item_id }).present();


   /* this.navCtrl.push(Proceed_Detail, {
      item_id: item_id
    });*/
  }


  /*
  
     getDays(t) {
      var days;
      days = Math.floor(t / 86400);
  
      return days;
    }
  
    getHours(t) {
      var days, hours;
      days = Math.floor(t / 86400);
      t -= days * 86400;
      hours = Math.floor(t / 3600) % 24;
  
      return hours;
    }
  
    getMinutes(t) {
      var days, hours, minutes;
      days = Math.floor(t / 86400);
      t -= days * 86400;
      hours = Math.floor(t / 3600) % 24;
      t -= hours * 3600;
      minutes = Math.floor(t / 60) % 60;
  
      return minutes;
    }
  
    getSeconds(t) {
      var days, hours, minutes, seconds;
      days = Math.floor(t / 86400);
      t -= days * 86400;
      hours = Math.floor(t / 3600) % 24;
      t -= hours * 3600;
      minutes = Math.floor(t / 60) % 60;
      t -= minutes * 60;
      seconds = t % 60;
  
      return seconds;
    }
  
  */
  /*  dhms(t) {
      var days, hours, minutes, seconds;
      days = Math.floor(t / 86400);
      t -= days * 86400;
      hours = Math.floor(t / 3600) % 24;
      t -= hours * 3600;
      minutes = Math.floor(t / 60) % 60;
      t -= minutes * 60;
      seconds = t % 60;
  
      return [
        days + '일',
        hours + '시간',
        minutes + '분',
        seconds + '초'
      ].join(' ');
    }
    
    ngOnInit() {
      this.future = new Date(this.futureString);
      this.$counter = Observable.interval(1000).map((x) => {
        this.diff = Math.floor((this.future.getTime() - new Date().getTime()) / 1000);
        return x;
      });
  
      this.subscription = this.$counter.subscribe((x) => this.message = this.dhms(this.diff));
  
      console.log("message : " +this.message);
    }
  
    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }
  
  */


  // reverse_counter() {
  //    let today = new Date();
  //    let d_day = new Date("May 01 2017 00:00:00");
  //    let days = (d_day - today) / 1000 / 60 / 60 / 24;
  //    let daysRound = Math.floor(days);
  //    let hours = (d_day - today) / 1000 / 60 / 60 - (24 * daysRound);
  //    let hoursRound = Math.floor(hours);
  //    let minutes = (d_day - today) / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound);
  //    let minutesRound = Math.floor(minutes);
  //    let seconds = (d_day - today) / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) -
  //         (60 * minutesRound);
  //    let secondsRound = Math.round(seconds);
  //    let sec = " 초."
  //    let min = " 분, "
  //    let hr = " 시간, "
  //    let dy = " 일, "

  //     //폼에 출력부분다이나믹 
  //     document.counter.counter_box.value = " 경매종료시간 : " + daysRound +
  //         dy + hoursRound + hr + minutesRound + min + secondsRound + sec;

  //     //텍스트 출력 부분

  //     document.all["counter1"].innerHTML = "경매종료시간 :" + daysRound + dy + hoursRound + hr + minutesRound + min + secondsRound + sec;

  //     let newtime = window.setTimeout("reverse_counter();", 1000);
  // }

  @ViewChild(Slides) slides: Slides;


}
