import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';
 
/*
  Generated class for the Localstorage provider.
 
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Localstorage {
 
  constructor(public http: Http,private storage:Storage) {
    console.log('Hello Localstorage Provider');
    }
 
    //store the email address
    setAccessToken(data){
    this.storage.set('access_token',data);
    }
 
    //get the stored email
    getAccessToken(){
      this.storage.get('access_token').then(access_token=>{
        console.log('access_token: '+ access_token);
      });
    }
 
    //delete the email address
    setRefreshToken(data){
          this.storage.set('refresh_token',data.refresh_token);
    }
 
    //clear the whole local storage
    getRefreshToken(){
      this.storage.get('refresh_token').then(refresh_token=>{
        console.log('refresh_token: '+ refresh_token.refresh_token);
      });
    }
 
}