import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AlertController, LoadingController, Loading } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Localstorage } from '../providers/localstorage';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import jsSHA from 'jssha'
declare var require: Function;

const localforage: LocalForage = require('localforage');
// import * as bcryptjs from "bcryptjs";

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

export class User {
  private email: string;
  private name: string;
  private birth: string;
  private phone: string;

  constructor(email: string, name: string, birth: string, phone: string) {
    this.email = email;
    this.name = name;
    this.birth = birth;
    this.phone = phone;
  }
  getEmail() {
    return this.email;
  }
  getName() {
    return this.name;
  }
  getBirth() {
    return this.birth;
  }
  getPhone() {
    return this.phone;
  }

}

@Injectable()
export class AuthService {
  currentUser: User;
  storage: Localstorage;
  loading: Loading;
  user_data = {};
  email = { email: '' };

  constructor(private http: Http, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
  }

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("이메일과 비밀번호를 입력하세요");
    } else {
      return Observable.create(observer => {

        let sha = new jsSHA("SHA-256", "TEXT");
        sha.update(credentials.password);
        let hash = sha.getHash("HEX");

        //credentials.password = hash;

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        //headers.append('Authorization', 'Basic ' + btoa(credentials.email + ":" + credentials.password));
        headers.append('Authorization', 'Basic bXktdHJ1c3RlZC1jbGllbnQ6Y2xpZW50X3NlY3JldA==');
        headers.append('Accept', 'application/json');

        var info = "grant_type=password&username=" + credentials.email + "&password=" + hash;
        this.http.post('http://www.fixme.kr/oauth/token', info, { headers: headers })
          .map(res => res.json())
          .subscribe(data => {
            this.user_data = data;

            //토큰 값 저장
            this.setToken(this.user_data);

            //유저 정보 저장
            this.setUserInfo(this.user_data);

            observer.next(true);
            observer.complete();

          }, (err) => {
            if (err.status == 401) {
              this.presentLoginAlert();
            }
            observer.next(false);
            observer.complete();
          });
      });
    }
  }


  presentLoginAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error 발생[1021]',
      subTitle: '지속적인 오류 발생시 관리자에게 문의해주세요',
      buttons: ['확인']
    });
    alert.present();
  }
  presentLoginAlert2() {
    let alert = this.alertCtrl.create({
      title: 'Error 발생[1022]',
      subTitle: '지속적인 오류 발생시 관리자에게 문의해주세요',
      buttons: ['확인']
    });
    alert.present();
  }

  //이메일 중복검사
  checkEmail(email) {
    return Observable.create(observer => {
      let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
      let url = 'http://www.fixme.kr/users/check';
      //console.log("email : " + email.value);

      this.email.email = email.value;
      //console.log("email : " + JSON.stringify(this.email));
      this.http.post(url, this.email, { headers: headers }).map(res => res.json())
        .subscribe(success => {
          observer.next(success);
          observer.complete();
        })
    })
  }


  //개인정보 가져오기
  getUserInfo(): User {
    this.getAccessToken().subscribe(token => {
      let url = 'http://www.fixme.kr/profile/?access_token=' + token;
      this.http.get(url).map(res => res.json())
        .subscribe(data => {
          this.currentUser = new User(data.user_email, data.user_name, data.user_birth, data.user_phone);
          //this.presentcert1(JSON.stringify(data));
        },
        error => {
          //에러 발생
          this.presentNetworkAlert();
        });
    })
    return this.currentUser;
  }

  getInfo(data) {
    return Observable.create(observer => {
      localforage.getItem(data).then((result) => {
        if (result == null) {
          //로그인 안한거
          observer.next(false);
          observer.complete();
        } else {
          //로그인 한거
          observer.next(true);
          observer.complete();
        }
      }, (error) => {
        observer.next(null);
        observer.complete();
      });
    });
  }

  //개인정보 저장
  setUserInfo(data) {
    let access_token = data.access_token;
    let url = 'http://www.fixme.kr/profile/?access_token=' + access_token;
    this.http.get(url).map(res => res.json())
      .subscribe(data => {
        this.currentUser = new User(data.user_email, data.user_name, data.user_birth, data.user_phone);
        localforage.setItem('user', this.currentUser);
      },
      error => {
        //에러 발생
        this.presentNetworkAlert();
      });

  }

  presentNetworkAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error 발생[1001]',
      subTitle: '지속적인 오류 발생시 관리자에게 문의해주세요',
      buttons: ['확인']
    });
    alert.present();
  }



  //계좌 설정하기
  setAccount(data) {
    return Observable.create(observer => {
      this.getAccessToken().subscribe(token => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let url = 'http://www.fixme.kr/profile/account?access_token=' + token;
        this.http.post(url, JSON.stringify(data), { headers: headers }).subscribe(success => {
          if (success) {
            this.presentSuccess();
            observer.next(success);
            observer.complete();
          }
        },
          error => {
            //에러 발생
            this.presentAccountAlert();
          });
      })
    })
  }

  presentSuccess() {
    let alert = this.alertCtrl.create({
      title: '성공',
      subTitle: '계좌정보를 등록하였습니다',
      buttons: ['확인']
    });
    alert.present();
  }

  presentAccountAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error 발생[1011]',
      subTitle: '지속적인 오류 발생시 관리자에게 문의해주세요',
      buttons: ['확인']
    });
    alert.present();
  }


  //계좌 불러오기
  getAccount() {
    return Observable.create(observer => {
      this.getAccessToken().subscribe(token => {
        let url = 'http://www.fixme.kr/profile/account?access_token=' + token;
        this.http.get(url).map(res => res.json()).subscribe(data => {
          //this.presentSuccess11(JSON.stringify(data));
          observer.next(data);
          observer.complete();
        },
          error => {
            if (error.status == 401) {
              this.changeToken();
            } else {
            }
          })
      })
    })
  }
  presentSuccess11(data) {
    let alert = this.alertCtrl.create({
      title: ' 값 : ' + data,
      subTitle: '성공',
      buttons: ['확인']
    });
    alert.present();
  }
  presentError11(data) {
    let alert = this.alertCtrl.create({
      title: ' 값 : ' + data,
      subTitle: '실패',
      buttons: ['확인']
    });
    alert.present();
  }
  presentError22(data) {
    let alert = this.alertCtrl.create({
      title: ' 에러 : ' + data,
      subTitle: '실패',
      buttons: ['확인']
    });
    alert.present();
  }

  //토큰 값 저장
  setToken(data) {
    this.deleteAccessToken();
    localforage.setItem('access_token', data.access_token);
    localforage.setItem('refresh_token', data.refresh_token);
  }

  presentEx(data) {
    let alert = this.alertCtrl.create({
      title: data,
      subTitle: '',
      buttons: ['확인']
    });
    alert.present();
  }


  getRefreshToken() {
    return Observable.create(observer => {
      localforage.getItem('refresh_token').then((result) => {
        if (result === null) {
          //없는거
          observer.next(false);
          observer.complete();
        } else {
          //있는거
          observer.next(result);
          observer.complete();
          return result;
        }
      }, (error) => {
        this.presentEx('저기');
        observer.next(error);
        observer.complete();
      })
    });
  }

  getAccessToken() {
    return Observable.create(observer => {
      localforage.getItem('access_token').then((result) => {
        if (result === null) {
          //로그인 안한거
          observer.next(false);
          observer.complete();
          return false;
        } else {
          //로그인 한거
          observer.next(result);
          observer.complete();
          return result;
        }
      }, (error) => {
        observer.next(false);
        observer.complete();
        return null;
      });
    });
  }

  changeToken() {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    headers.append('Authorization', 'Basic bXktdHJ1c3RlZC1jbGllbnQ6Y2xpZW50X3NlY3JldA==');
    headers.append('Accept', 'application/json');
    let url = "http://www.fixme.kr/oauth/token";

    this.getRefreshToken().subscribe(success => {
      if (success) {
        let info = "grant_type=refresh_token&refresh_token=" + success;

        this.http.post(url, info, { headers: headers })
          .map(res => res.json()).subscribe(data => {
            this.setToken(data);
            this.presentReLogin();
          }, error => {
          })
      }
    });
  }
  presentReLogin() {
    let alert = this.alertCtrl.create({
      title: '다시 시도하세요',
      subTitle: '',
      buttons: ['확인']
    });
    alert.present();
  }

  presentE(data) {
    let alert = this.alertCtrl.create({
      title: data,
      subTitle: '',
      buttons: ['확인']
    });
    alert.present();
  }

  //저장소 비우기
  deleteAccessToken() {
    localforage.clear();
  }

  // presentAlert4(data) {
  //   let alert = this.alertCtrl.create({
  //     title: data,
  //     subTitle: '4',
  //     buttons: ['확인']
  //   });
  //   alert.present();
  // }




  //비밀번호 재입력 확인
  static passwordsMatch(cg: FormGroup): { [err: string]: any } {
    let pwd1 = cg.get('user_password');
    let pwd2 = cg.get('user_re_password');
    let rv: { [error: string]: any } = {};
    if ((pwd1.touched || pwd2.touched) && pwd1.value !== pwd2.value) {
      rv['passwordMismatch'] = true;
    }
    return rv;
  }


  //회원가입
  public register(credentials) {
    if (credentials.user_email == null || credentials.user_password == null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        // console.log("email : " + credentials.user_email);
        // console.log("pass : " + credentials.user_password);
        // console.log("birth :" + credentials.user_birth);
        // console.log("name :" + credentials.user_name);
        // console.log("phone:" + credentials.user_phone);
        // console.log("gender :" + credentials.user_gender);

        /* let hash=bcryptjs.hashSync(credentials.user_password,10);
         console.log("hash : "+hash);
        
        credentials.user_password=hash;
        console.log("change pwd : "+credentials.user_password);
 
        //비번 맞는지 비교
          let assertTrue = bcryptjs.compareSync("qwe123!@#", hash);
          console.log("ture or false : "+assertTrue);
         */
        let sha = new jsSHA("SHA-256", "TEXT");
        sha.update(credentials.user_password);
        let hash = sha.getHash("HEX");

        credentials.user_password = hash;

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let url = "http://www.fixme.kr/users/";
        this.http.post(url, JSON.stringify(credentials), { headers: headers })
          .subscribe(success => {
            if (success) {
              //회원가입 성공시
              //this.currentUser = new User(credentials.user_email, credentials.user_name, credentials.user_birth, credentials.user_phone);
              observer.next(true);
              observer.complete();
            } else {
              //회원가입 실패시
              this.presentRegisterAlert();
            }
          },
          error => {
            //에러 발생
            this.presentRegisterAlert2();
          });

      });
    }
  }
  presentRegisterAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error 발생[1031]',
      subTitle: '지속적인 오류 발생시 관리자에게 문의해주세요',
      buttons: ['확인']
    });
    alert.present();
  }
  presentRegisterAlert2() {
    let alert = this.alertCtrl.create({
      title: 'Error 발생[1032]',
      subTitle: '지속적인 오류 발생시 관리자에게 문의해주세요',
      buttons: ['확인']
    });
    alert.present();
  }



  //폰 인증번호 보내기
  certPhone(phone) {
    if (phone == null) {
      return Observable.throw("Please insert phoneNumber");
    } else {
      return Observable.create(observer => {

        let url = "http://www.fixme.kr/cert/" + phone;
        this.http.get(url).map(res => res.json()).subscribe(data => {
          if (data) {
            //성공시
            observer.next(data);
            observer.complete();
          } else {
            //실패시
            this.presentPhoneAlert();
          }
        },
          error => {
            //에러 발생
            this.presentPhoneAlert2();
          });

      });
    }
  }
  presentPhoneAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error 발생[1041]',
      subTitle: '지속적인 오류 발생시 관리자에게 문의해주세요',
      buttons: ['확인']
    });
    alert.present();
  }
  presentPhoneAlert2() {
    let alert = this.alertCtrl.create({
      title: 'Error 발생[1042]',
      subTitle: '지속적인 오류 발생시 관리자에게 문의해주세요',
      buttons: ['확인']
    });
    alert.present();
  }


  logout() {
    return Observable.create(observer => {
      this.deleteAccessToken();
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

}