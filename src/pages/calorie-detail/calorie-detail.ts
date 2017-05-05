import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/*
  Generated class for the CalorieDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-calorie-detail',
  templateUrl: 'calorie-detail.html'
})
export class CalorieDetailPage {
	Foods: any;
	cal: number;
	meal: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  	this.Foods = navParams.get('Foods');
  	this.cal = navParams.get('cal');
  	this.meal = navParams.get('meal');
  }

  ionViewWillEnter(){
  	
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CalorieDetailPage');
  }


}
