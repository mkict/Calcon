import { Component } from '@angular/core';
import { NavController, NavParams,Nav} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import { Auth, User} from '@ionic/cloud-angular';
/*
  Generated class for the Bmr page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-bmr',
  templateUrl: 'bmr.html'
})
export class BmrPage {
  Tabs = TabsPage;
  bmr: number;
  weight: number; 
  height: number;
  age: number;
  bmi: number;
  gender: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,  public nav: Nav, public auth: Auth, public user: User) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BmrPage');
    this.gender = this.user.get('gender','');
    this.weight = this.user.get('weight',0);
    this.height = this.user.get('height',0);
    this.age = this.user.get('age',0);
    this.bmr = 10*this.weight;
    this.bmr = this.bmr + 6.25*this.height;
    if(this.gender === 'male'){
      this.bmr = this.bmr + 5*this.age+5;
    }else{
      this.bmr = this.bmr + 5*this.age-161;
    }
    
    this.bmi = this.weight/((this.height/100)*(this.height/100));
    this.user.set('bmr',this.bmr);
    this.user.set('bmi',this.bmi);
    this.user.save();
  }

  gotoDashboard() {
    this.nav.setRoot(this.Tabs);
  }

}
