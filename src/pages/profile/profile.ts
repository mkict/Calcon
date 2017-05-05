import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { Auth, User} from '@ionic/cloud-angular';
/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  name: string;
  weight: number;
  height: number;
  age: number;
  bmr: number;
  gender: string;
  bmi: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, public auth: Auth, public user: User) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.menu.swipeEnable(false);
    this.name = this.user.details.name;
    this.weight = this.user.get('weight',0);
    this.height = this.user.get('height',0);
    this.age = this.user.get('age',0);
    this.bmr = this.user.get('bmr',0);
    this.gender = this.user.get('gender','');
    this.bmi = this.user.get('bmi',0).toFixed(2);
  }

   openModal(){
  	this.navCtrl.setRoot(DashboardPage);
  }

  ionViewDidLeave(){
    this.menu.swipeEnable(true);
  }
}
