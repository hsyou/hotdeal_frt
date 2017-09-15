import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { AuthService } from '../../providers/auth-service';
/**
 * Generated class for the PaymentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  authForm: FormGroup;
  account_holder: AbstractControl;
  account_number: AbstractControl;
  account_bank: AbstractControl;

  holder: any;
  number: any;
  bank: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService,
    private alertCtrl: AlertController, private fb: FormBuilder, public http: Http) {
    this.authForm = fb.group({
      'account_holder': ['', Validators.required],
      'account_number': ['', Validators.required],
      'account_bank': ['', Validators.required],
    }, {});

    this.account_holder = this.authForm.controls['account_holder'];
    this.account_number = this.authForm.controls['account_number'];
    this.account_bank = this.authForm.controls['account_bank'];


    this.getAccount();

  }

  ionViewDidLoad() {
  }

  //계좌정보 가져오기
  getAccount() {
    this.auth.getAccount().subscribe(data => {
      this.holder = data.account_holder;
      this.number = data.account_number;
      this.bank = data.account_bank;
    },
      error => {

      });
  }

  //계좌 등록하기
  register(data: string) {
    this.auth.setAccount(data).subscribe(success => {
      this.navCtrl.pop();
    })
  }

  presentError(data) {
    let alert = this.alertCtrl.create({
      title: 'value 값 : ' + data,
      subTitle: '실패',
      buttons: ['확인']
    });
    alert.present();
  }
}
