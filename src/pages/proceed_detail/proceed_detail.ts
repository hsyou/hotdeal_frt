import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController, AlertController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Choice } from '../choice/choice';
import { AuthService } from "../../providers/auth-service";

@Component({
  selector: 'proceed_detail',
  templateUrl: 'proceed_detail.html'
})
export class Proceed_Detail {
  item_id: any;
  item_main_img: any;
  item_sub_img: any;
  item_link_img: any;
  item_link: any;
  item_like_flag: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,
    public viewCtrl: ViewController, private alertCtrl: AlertController, private auth: AuthService, public modalCtrl: ModalController) {
    //proceed에서 선택한 item_id값 받기
    this.item_id = this.navParams.get('item_id');
    // console.log("detail item_id : " + this.item_id);

    this.getItem();
  }


  getItem() {
    this.auth.getAccessToken().subscribe(token => {
      //로그인 되어있으면
      if (token) {
        var url = 'http://www.fixme.kr/items/' + this.item_id + "?access_token=" + token;
        this.http.get(url).map(res => res.json()).subscribe(data => {
          this.item_main_img = data.item_main_img;
          this.item_sub_img = data.item_sub_img;
          this.item_link_img = data.item_link_img;
          this.item_link = data.item_link;
          this.item_like_flag = data.item_like_flag;
        },
          err => {
            if (err.status == 401) {
              this.auth.changeToken();
            }
          }
        );

      } else {
        //로그인 안되어있으면
        var url = 'http://www.fixme.kr/items/' + this.item_id;
        this.http.get(url).map(res => res.json()).subscribe(data => {
          this.item_main_img = data.item_main_img;
          this.item_sub_img = data.item_sub_img;
          this.item_link_img = data.item_link_img;
          this.item_link = data.item_link;
          this.item_like_flag = 0;
        },
          err => {
            if (err.status == 401) {
              this.auth.changeToken();
            }
          }
        );
      }
    })
  }



  //좋아요 클릭시
  choiceLikeItem() {
    console.log("fsdfsdfsd");
    this.auth.getAccessToken().subscribe(token => {
      //로그인 되어있으면
      if (token) {
        let url = "http://www.fixme.kr/like/" + this.item_id + "?access_token=" + token;
        this.http.get(url).map(res => res.json()).subscribe(data => {
          //item_like,item_like_flag
          if (data == 1) {
            //좋아요 눌렀을 때
            this.item_like_flag = 1;
          } else if (data == 0) {
            //좋아요 취소시
            this.item_like_flag = 0;
          }
        })
      } else {
        //로그인 안되어있으면
        this.presentAlert();
      }
    },
      error => {
        if (error.status == 401) {
          this.auth.changeToken();
        } else {
          this.presentError();
        }
      })
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: '로그인하세요',
      subTitle: '',
      buttons: ['확인']
    });
    alert.present();
  }

  presentError() {
    let alert = this.alertCtrl.create({
      title: '에러코드[1060]',
      subTitle: '서버 접속에러',
      buttons: ['확인']
    });
    alert.present();
  }

  @ViewChild(Slides) slides: Slides;

  //창닫기
  back() {
    this.navCtrl.pop();
  }


  //옵션 선택하기
  choiceOption(item_id) {
    this.auth.getAccessToken().subscribe(success => {
      if (success) {
        //로그인 했을 경우 옵션페이지로 이동
        this.navCtrl.push(Choice, {
          item_id: item_id
        })
        // this.modalCtrl.create(Option,{item_id:item_id}).present();
      } else {
        //로그인 안 했을 경우 alert
        this.presentAlert();
      }
    })
  }


}
