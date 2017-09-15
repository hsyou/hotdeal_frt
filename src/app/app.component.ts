import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular';


import { ListPage } from '../pages/list/list';
import { HelpPage } from '../pages/help/help';
import { LoginPage } from '../pages/login/login';
import { Proceed } from '../pages/proceed/proceed';
import { Proceed_Detail } from '../pages/proceed_detail/proceed_detail';
import { SignupPage } from '../pages/signup/signup';
import { Choice } from '../pages/choice/choice'
import { Bid } from '../pages/bid/bid';
import { SetPage } from '../pages/set/set';
import { BillingInfoPage } from '../pages/billinginfo/billinginfo';
import { HelpLogin } from '../pages/helplogin/helplogin';
import { HelpLogin2 } from '../pages/helplogin2/helplogin2';
import { FindId } from '../pages/find_id/find_id';
import { FindPwd } from '../pages/find_pwd/find_pwd';

import { AuthService } from '../providers/auth-service';
import { Mypage } from '../pages/mypage/mypage';
import { Localstorage } from '../providers/localstorage';
import { UserSettingPage } from '../pages/user-setting/user-setting';
import { QnaPage } from '../pages/qna/qna';
import { NoticePage } from '../pages/notice/notice';
import { CooperatePage } from '../pages/cooperate/cooperate';
import { InquiryPage } from '../pages/inquiry/inquiry';
import { QnaAPage } from '../pages/qna-a/qna-a';
import { PaymentPage } from '../pages/payment/payment';
import { SplashPage } from '../pages/splash/splash';


@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SplashPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    private auth: AuthService, private alertCtrl: AlertController, public events: Events) {
    this.initializeApp();

    this.auth.getInfo('access_token').subscribe(success => {
      //this.presentAlert3(success);
      if (success==true) {
        this.pages = [
          { title: '홈', component: ListPage },
          { title: '나의정보', component: Mypage },
          //{ title: '결제정보', component: BillingInfoPage },
          // { title: '고객문의', component: HelpPage },
          { title: '설정', component: SetPage },
          { title: '제휴문의', component: CooperatePage },
          { title: '로그아웃', component: null },
        ];
      } else {
        //로그인안한거
        this.pages = [
          { title: '홈', component: ListPage },
          { title: '로그인', component: LoginPage },
          { title: '설정', component: SetPage },
          { title: '제휴문의', component: CooperatePage },

        ];
      }
    });

    events.subscribe('user:login', () => {
      this.pages = [
        { title: '홈', component: ListPage },
        { title: '나의정보', component: Mypage },
        //{ title: '결제정보', component: BillingInfoPage },
        // { title: '고객문의', component: HelpPage },
        { title: '설정', component: SetPage },
        { title: '제휴문의', component: CooperatePage },
        { title: '로그아웃', component: null },
      ];
    });
    events.subscribe('user:logout', () => {
      this.pages = [
        { title: '홈', component: ListPage },
        { title: '로그인', component: LoginPage },
        { title: '설정', component: SetPage },
        { title: '제휴문의', component: CooperatePage },
      ];
    });

    // used for an example of ngFor and navigation
  }
  presentAlert3(data) {
    let alert = this.alertCtrl.create({
      title: data+" :  aa : "+JSON.stringify(data),
      subTitle: '1111',
      buttons: ['확인']
    });
    alert.present();
  }



  public logout() {
    this.auth.logout().subscribe(succ => {
      this.events.publish("user:logout");
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.hide();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    if (page.component) {
      this.nav.setRoot(page.component);
    } else {
      //로그아웃
      this.logout();
      this.nav.setRoot(ListPage);
    }
  }
}
