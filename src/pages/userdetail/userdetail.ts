import { Component } from '@angular/core';
import { NavController, NavParams,Nav,MenuController, AlertController, LoadingController } from 'ionic-angular';
import { Auth, User} from '@ionic/cloud-angular';
import { BmrPage } from '../bmr/bmr';
/*
  Generated class for the Userdetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-userdetail',
  templateUrl: 'userdetail.html'
})
export class UserdetailPage {
  SubmitForm = BmrPage;
  age:number;
  gender:string;
  weight:number;
  height:number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public nav: Nav,public menu: MenuController, public auth: Auth, public user: User, public alertCtrl: AlertController, public loadingCtrl:LoadingController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserdetailPage');
  }
  douserdetail(){
  	if(this.age === 0 || this.gender === '' || this.weight === 0 || this.height === 0) {
        let alert = this.alertCtrl.create({
          title:'Error', 
          subTitle:'All fields are rquired',
          buttons:['OK']
        });
        alert.present();
        return;
      }
    this.user.set('age',this.age);
    this.user.set('gender',this.gender);
    this.user.set('weight',this.weight);
    this.user.set('height',this.height);
    this.user.save();
    this.navCtrl.setRoot(this.SubmitForm);
  }

}
