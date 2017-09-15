import { Component } from '@angular/core';
import { SignupPage } from '../signup/signup';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { ListPage } from '../list/list';
import { HomePage } from '../home/home';
import { HelpPage } from '../help/help';
import { Events } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { HelpLogin } from '../helplogin/helplogin';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',

})

export class LoginPage {

  loading: Loading;
  registerCredentials = { email: '', password: '' };


  constructor(private navCtrl: NavController, private auth: AuthService, private alertCtrl: AlertController,
    private loadingCtrl: LoadingController, public events: Events, private http: Http) { }


  public createAccount() {
    this.navCtrl.push(SignupPage);
  }

  public helpLogin() {
    this.navCtrl.push(HelpLogin);
  }


  public login() {
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {
          this.events.publish('user:login');
          this.navCtrl.setRoot(ListPage);
      } else {
        this.showError("이메일과 비밀번호를 확인하세요");
      }
    },
      error => {
        this.showError("연결 실패 : " + error + " 접속환경을 확인하세요");
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });

    let alert = this.alertCtrl.create({
      title: '실패',
      subTitle: text,
      buttons: ['확인']
    });
    alert.present(prompt);
  }
}
