import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

import { Proceed } from '../proceed/proceed';
import { Coming } from '../coming/coming';
import { FreeTicket } from '../freeticket/freeticket';
import { OnedayClass } from '../onedayclass/onedayclass';
import { NewsPage } from '../news/news';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
 
  tab1Root = Proceed;
  tab2Root = Coming;
  tab3Root = NewsPage;
  // tab4Root = FreeTicket;
  // tab5Root = OnedayClass;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}
    
   

}
