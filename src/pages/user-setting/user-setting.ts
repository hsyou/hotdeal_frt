import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CustomValidators } from '../signup/customvalidators';
import { User } from '../../providers/auth-service';
/**
 * Generated class for the UserSettingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user-setting',
  templateUrl: 'user-setting.html',
})
export class UserSettingPage {
  currentUser: User;
  username = '';
  email = '';
  birth = '';
  phone = '';

  authForm: FormGroup;
  user_phone: AbstractControl;
  cert_phone: AbstractControl;
  phoneSuccess = 1091701997;

  phoneVO = { old_phone: '', new_phone: '' };

  constructor(private http: Http, public navCtrl: NavController, private fb: FormBuilder, private alertCtrl: AlertController,
    public navParams: NavParams, private auth: AuthService, public events: Events) {
    this.ionViewDidLoad();

    this.phoneVO.old_phone = this.phone;

    this.authForm = this.fb.group({
      'user_phone': ['', Validators.compose([Validators.required, Validators.minLength(8), CustomValidators.checkPhoneValidator])],
      'cert_phone': ['', Validators.required],
    }, {});

    this.user_phone = this.authForm.controls['user_phone'];
    this.cert_phone = this.authForm.controls['cert_phone'];
  }

  //인증 버튼 클릭시
  changePhone() {
    let phoneNumer = this.authForm.controls['user_phone'].value;
    // 인증번호 입력안할시
    if (phoneNumer == 1091701997) {
      this.authForm.controls['cert_phone'].setErrors({ "required": true });
    }

    this.auth.certPhone(phoneNumer).subscribe(data => {
      if (data) {
        //성공시
        this.phoneSuccess = data;

      } else {
        //실패시

      }
    })
  }

  getUser() {

  }

  //인증 번호 값 비교
  checkCert() {
    //this.presentcert1(this.authForm.controls['cert_phone'].value, this.phoneSuccess);

    if (this.authForm.controls['cert_phone'].value == this.phoneSuccess) {
      //인증 번호랑 값 같을경우
      this.authForm.controls['cert_phone'].setErrors({ "cert_match": true });

      this.auth.getAccessToken().subscribe(token => {
        if (token) {
          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          this.phoneVO.new_phone = this.authForm.controls['user_phone'].value;

          //this.presentAlert2(JSON.stringify(this.phoneVO));

          var url = "http://www.fixme.kr/profile/phone?access_token=" + token;
          this.http.post(url, this.phoneVO, { headers: headers })
            .subscribe(success => {
              if (success) {
                // 성공시
                //this.presentAlert('변경 완료');
                this.ionViewDidLoad();

              } else {
                // 실패시
                //this.presentAlert('변경 실패');
              }
            },
            error => {
              if(error.status==401){
                this.auth.changeToken();
              }
            });
        } else {
          //값이 없으면 로그인안한거
          this.navCtrl.popAll();
        }
      });
    } else {
      //값 다를경우 에러
      this.authForm.controls['cert_phone'].setErrors({ "cert_mismatch": true });
    }
  }

  presentcert1(data1, data2) {
    let alert = this.alertCtrl.create({
      title: '입력한 인증번호 : ' + data1 + ' 서버에서 받은번호 : ' + data2,
      subTitle: '성공',
      buttons: ['확인']
    });
    alert.present();
  }
  presentAlert(data) {
    let alert = this.alertCtrl.create({
      title: data,
      subTitle: '',
      buttons: ['성공']
    });
    alert.present();
  }
  presentAlert2(data) {
    let alert = this.alertCtrl.create({
      title: '여기',
      subTitle: data,
      buttons: ['성공']
    });
    alert.present();
  }


  ionViewDidLoad() {
    let info = this.auth.getUserInfo();
    this.username = info.getName();
    this.email = info.getEmail();
    this.birth = info.getBirth();
    this.phone = info.getPhone();

  }

}
