import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
/**
 * Generated class for the NewsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  news:{};

  constructor(public navCtrl: NavController,private alertCtrl: AlertController, public http: Http, public navParams: NavParams) {
    this.getNews();
}

  ionViewDidLoad() {
  }
  
  getNews(){
    var url='http://www.fixme.kr/news/';
    this.http.get(url).map(res=>res.json()).subscribe(data=>{
      this.news = data;
    })
  }

   presentcert(data) {
    let alert = this.alertCtrl.create({
      title: data + '로딩성공',
      subTitle: '성공',
      buttons: ['확인']
    });
    alert.present();
  }

}
