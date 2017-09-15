import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';
import { HelpPage } from '../pages/help/help';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Proceed } from '../pages/proceed/proceed';
import { Coming } from '../pages/coming/coming';
import { FreeTicket } from '../pages/freeticket/freeticket';
import { OnedayClass } from '../pages/onedayclass/onedayclass';
import { Proceed_Detail } from '../pages/proceed_detail/proceed_detail';
import { SignupPage } from '../pages/signup/signup';
import { AuthService } from '../providers/auth-service';
import { Localstorage } from '../providers/localstorage';
import { Mypage } from '../pages/mypage/mypage';
import { Choice } from '../pages/choice/choice';
import { Bid } from '../pages/bid/bid';
import { SetPage } from '../pages/set/set';
import { HelpLogin } from '../pages/helplogin/helplogin';
import { HelpLogin2 } from '../pages/helplogin2/helplogin2';
import { FindId } from '../pages/find_id/find_id';
import { FindPwd } from '../pages/find_pwd/find_pwd';
import { UserSettingPage } from '../pages/user-setting/user-setting';
import { QnaPage } from '../pages/qna/qna';
import { NoticePage } from '../pages/notice/notice';
import { UpdatehistoryPage } from '../pages/updatehistory/updatehistory';
import { CooperatePage } from '../pages/cooperate/cooperate';
import { IonicStorageModule } from '@ionic/storage';
import { InquiryPage } from '../pages/inquiry/inquiry';
import { QnaAPage } from '../pages/qna-a/qna-a';
import { QnaQPage } from '../pages/qna-q/qna-q';
import { MypageFixDetailPage } from '../pages/mypage-fix-detail/mypage-fix-detail';
import { BuyPage } from '../pages/buy/buy';
import { NewsPage } from '../pages/news/news';
import { PaymentPage } from '../pages/payment/payment';
import { NoticeDetailPage } from '../pages/notice-detail/notice-detail';
import { ComingDetailPage } from '../pages/coming-detail/coming-detail';
import { SplashPage } from '../pages/splash/splash';
import { HelpPeoplePage } from '../pages/help-people/help-people';
@NgModule({
  declarations: [
    MyApp,
    ListPage,
    Proceed,
    Coming,
    FreeTicket,
    OnedayClass,
    HelpPage,
    LoginPage,
    Proceed_Detail,
    SignupPage,
    Mypage,
    Choice,
    Bid,
    SetPage,
    HelpLogin,
    FindId,
    FindPwd,
    HelpLogin2,
    UserSettingPage,
    QnaPage,
    NoticePage,
    UpdatehistoryPage,
    CooperatePage,
    InquiryPage,
    QnaAPage,
    QnaQPage,
    MypageFixDetailPage,
    BuyPage,
    NewsPage,
    PaymentPage,
    NoticeDetailPage,
    ComingDetailPage,
    SplashPage,
    HelpPeoplePage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    Proceed,
    Coming,
    FreeTicket,
    OnedayClass,
    HelpPage,
    LoginPage,
    Proceed_Detail,
    SignupPage,
    Mypage,
    Choice,
    Bid,
    SetPage,
    HelpLogin,
    FindId,
    FindPwd,
    HelpLogin2,
    UserSettingPage,
    QnaPage,
    NoticePage,
    UpdatehistoryPage,
    CooperatePage,
    InquiryPage,
    QnaAPage,
    QnaQPage,
    MypageFixDetailPage,
    BuyPage,
    NewsPage,
    PaymentPage,
    NoticeDetailPage,
    ComingDetailPage,
    SplashPage,
    HelpPeoplePage
  ],
  providers: [
    AuthService,
    Localstorage,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
})
export class AppModule { }
