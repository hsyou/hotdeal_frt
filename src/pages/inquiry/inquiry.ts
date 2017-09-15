import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,Events } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { Http, Headers } from '@angular/http';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { QnaPage } from "../qna/qna";
/**
 * Generated class for the InquiryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-inquiry',
  templateUrl: 'inquiry.html',
})
export class InquiryPage {
  inquiryForm: FormGroup;
  inquiry_title: AbstractControl;
  inquiry_content: AbstractControl;



  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,
    private auth: AuthService, public events: Events, public alertCtrl: AlertController, private fb: FormBuilder) {

    this.inquiryForm = fb.group({
      'inquiry_title': ['', Validators.required],
      'inquiry_content': ['', Validators.required]
    })

    this.inquiry_title = this.inquiryForm.controls['inquiry_title'];
    this.inquiry_content = this.inquiryForm.controls['inquiry_content'];
  }




  ionViewDidLoad() {

  }

  //문의하기
  register(value: string) {
    this.auth.getAccessToken().subscribe(token => {
      if (token) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let url = "http://www.fixme.kr/profile/inquiry?access_token=" + token;

        this.http.post(url, JSON.stringify(value), { headers: headers })
          .subscribe(success => {
            if (success) {
              this.presentSuccess();
              
              //this.events.publish('page-qna');
              this.navCtrl.popAll();
              //this.navCtrl.push(QnaPage)
            } else {
              this.presentError();
            }
          },
        (error)=>{
          if(error.status==401){
            this.auth.changeToken();
          }
        })
      } else {
        //로그인 안했을 경우
      }
    })
  }

  presentSuccess() {
    let alert = this.alertCtrl.create({
      title: '문의가 등록되었습니다',
      subTitle: '',
      buttons: ['확인']
    });
    alert.present();
  }
  presentError() {
    let alert = this.alertCtrl.create({
      title: 'Error 발생[1051]',
      subTitle: '지속적인 오류 발생시 관리자에게 문의해주세요',
      buttons: ['확인']
    });
    alert.present();
  }

}
