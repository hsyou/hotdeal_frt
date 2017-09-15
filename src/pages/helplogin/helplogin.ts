import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { Events } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { FindId } from '../find_id/find_id';
import { FindPwd } from '../find_pwd/find_pwd';

@Component({
  selector: 'helplogin',
  templateUrl: 'helplogin.html',

})

export class HelpLogin {



  constructor(private navCtrl: NavController, private auth: AuthService, private alertCtrl: AlertController,
    private loadingCtrl: LoadingController, public events: Events, private http: Http) { }

  findId(){
    this.navCtrl.push(FindId);
  }
  findPwd(){
     this.navCtrl.push(FindPwd);
  }

}
