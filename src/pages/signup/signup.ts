import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CustomValidators } from '../signup/customvalidators';
import { LoginPage } from '../login/login';
import { Http, Headers } from '@angular/http';
import { Events } from 'ionic-angular';
import * as $ from 'jquery';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',

})

export class SignupPage {
  authForm: FormGroup;
  user_email: AbstractControl;
  user_password: AbstractControl;
  user_re_password: AbstractControl;
  user_name: AbstractControl;
  user_phone: AbstractControl;
  user_birth: AbstractControl;
  user_gender: AbstractControl;
  cert_phone: AbstractControl;

  phoneSuccess = 1091701997;

  constructor(private nav: NavController, public events: Events, private auth: AuthService, private alertCtrl: AlertController,
    private fb: FormBuilder, public http: Http) {

    this.authForm = fb.group({
      'user_email': ['', Validators.compose([Validators.required, Validators.minLength(8), CustomValidators.checkEmailValidator])],
      'user_password': ['', Validators.compose([Validators.required, Validators.minLength(8), CustomValidators.checkPwdValidator])],
      'user_re_password': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      'user_name': ['', Validators.required],
      'user_phone': ['', Validators.compose([Validators.required, Validators.minLength(8), CustomValidators.checkPhoneValidator])],
      'user_birth': ['', Validators.required],
      'user_gender': ['', Validators.required],
      'cert_phone': ['', Validators.required],
    }, { validator: CustomValidators.checkPasswordsMatch });

    this.user_password = this.authForm.controls['user_password'];
    this.user_re_password = this.authForm.controls['user_re_password'];
    this.user_email = this.authForm.controls['user_email'];
    this.user_name = this.authForm.controls['user_name'];
    this.user_phone = this.authForm.controls['user_phone'];
    this.user_birth = this.authForm.controls['user_birth'];
    this.user_gender = this.authForm.controls['user_gender'];
    this.cert_phone = this.authForm.controls['cert_phone'];

  }

  //이메일 중복검사
  checkEmail() {
    this.auth.checkEmail(this.user_email).subscribe(success => {
      if (success==0) {
        this.presentCheckEmailSuccess();
        this.authForm.controls['user_email'].setErrors({ "success": true });
      } else if(success>0){
        this.presentCheckEmailFail();
        this.authForm.controls['user_email'].setErrors({ "duplicate": true });
      }else{

      }
    })
  }
  presentCheckEmailSuccess() {
    let alert = this.alertCtrl.create({
      title: '이메일 사용 가능',
      subTitle:'사용가능한 이메일입니다.',
      buttons: ['확인']
    });
    alert.present();
  }


  presentCheckEmailFail() {
    let alert = this.alertCtrl.create({
      title: '이메일 사용 불가',
      subTitle: '중복된 이메일이 있습니다',
      buttons: ['확인']
    });
    alert.present();
  }


  //회원가입
  public register(value: string) {
    this.auth.register(value).subscribe(success => {
      if (success) {
        //회원가입 성공시
        this.showPopup("가입성공", "픽스미 회원이 되신걸 환영합니다! 로그인해주시면 이용가능합니다^^");
        // console.log("success : " + success);
      } else {
        //실패시
        this.showPopup("Error", "Problem creating account.");
      }
    },
      error => {
        //에러발생시
        this.showPopup("Error", error);
      });
  }

  //인증 버튼 클릭시
  certPhone() {
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
  //인증 번호 값 비교
  checkCert() {
    //this.presentcert1(this.authForm.controls['cert_phone'].value,this.phoneSuccess);
    if (this.authForm.controls['cert_phone'].value == this.phoneSuccess) {
      this.authForm.controls['cert_phone'].setErrors({ "cert_match": true });
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


  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: '확인',
          handler: data => {
            this.events.publish('user:logout');
            this.nav.push(LoginPage);
            /*this.nav.popToRoot();*/
          }
        }
      ]
    });
    alert.present();

  }
}

