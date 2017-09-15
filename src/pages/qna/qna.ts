import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { InquiryPage } from '../inquiry/inquiry';
import { AuthService } from '../../providers/auth-service';
import { Http, Headers } from '@angular/http';
import { QnaAPage } from '../qna-a/qna-a'
import { QnaQPage } from '../qna-q/qna-q'
/**
 * Generated class for the QnaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */0
@IonicPage()
@Component({
  selector: 'page-qna',
  templateUrl: 'qna.html',
})
export class QnaPage {
  qna: string = "waiting";
  list: any;
  end: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private auth: AuthService,
    public alertCtrl: AlertController, ) {

    this.auth.getAccessToken().subscribe(token => {
      if (token) {
        let url = "http://www.fixme.kr/profile/inquiry?access_token=" + token; //답변 대기중 문의
        let url2 = "http://www.fixme.kr/profile/inquiry/end?access_token=" + token; //답변 완료된 문의

        this.http.get(url).map(res => res.json()).subscribe(success => {
          if (success) {
            // 성공시
            this.list = success;
          } else {
            // 실패시
          }
        });
        this.http.get(url2).map(res => res.json()).subscribe(success => {
          if (success) {
            // 성공시
            this.end = success;
          } else {
            // 실패시
          }
        },
          error => {
            if (error.status == 401) {
              //토큰값 기간 만료시
              this.auth.changeToken();
            }
          });
      } else {
        //로그인 안했을 경우 
      }
    })
  }

  ionViewDidLoad() {
  }


  //문의하기 클릭시
  inquiry() {
    this.navCtrl.push(InquiryPage);
  }
  presentAlert(data1, data2, data3) {
    let alert = this.alertCtrl.create({
      title: '제목 : ' + data1 + ' 내용 : ' + data2 + ' 답변 : ' + data3,
      subTitle: '성공 : ',
      buttons: ['성공']
    });
    alert.present();
  }

  //답변대기중 문의에서 질문 클릭시
  showQna(title, content) {
    this.navCtrl.push(QnaQPage, {
      title: title, content: content
    });
  }

  //답변완료된 문의에서 질문 클릭시
  endQna(title, content, answer) {
    //this.presentAlert(title,content,answer);
    this.navCtrl.push(QnaAPage,
      {
        title: title, content: content, answer: answer
      });
  }

}
