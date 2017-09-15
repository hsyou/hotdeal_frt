import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HelpLogin2 } from '../helplogin2/helplogin2';
import { Http, Headers } from '@angular/http';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

/**
 * Generated class for the FindId page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-find_id',
  templateUrl: 'find_id.html',
})
export class FindId {
  findForm: FormGroup;
  name: AbstractControl;
  phone: AbstractControl;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,
    public alertCtrl: AlertController, private fb: FormBuilder) {

    this.findForm = fb.group({
      'name': ['', Validators.required],
      'phone': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    })

    this.name = this.findForm.controls['name'];
    this.phone = this.findForm.controls['phone'];

  }

  ionViewDidLoad() {
  }

  helpLogin2() {
    this.navCtrl.push(HelpLogin2);
  }

  //아이디 찾기
  find_id(value: string) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let url = "http://www.fixme.kr/users/id";

    this.http.post(url, JSON.stringify(value), { headers: headers })
      .subscribe(success => {
        if (success) {
          this.distinguish(success);
        } else {
          this.presentError();
        }
      })
  }

  //보낸 이름과 휴대폰번호과 일치하는지 여부
  distinguish(data) {
    if (data._body == 'ok') {
      //일치할경우 서버에서 ok받음
      this.presentSuccess();
      this.navCtrl.pop();

    } else if (data._body == 'fail') {
      //실패할경우 서버에서 fail받음
      this.presentFail();
    }
  }

  //성공시
  presentSuccess() {
    let alert = this.alertCtrl.create({
      title: '문자 발송',
      subTitle: '고객님의 문자를 확인하세요',
      buttons: ['확인']
    });
    alert.present();
  }
  //실패시
  presentFail() {
    let alert = this.alertCtrl.create({
      title: '아이디 찾기 실패',
      subTitle: '이름과 휴대폰 번호를 다시 입력해주세요',
      buttons: ['확인']
    });
    alert.present();
  }
  //에러발생시
  presentError() {
    let alert = this.alertCtrl.create({
      title: 'Error 발생[1201]',
      subTitle: '지속적인 오류 발생시 관리자에게 문의해주세요',
      buttons: ['확인']
    });
    alert.present();
  }
}
