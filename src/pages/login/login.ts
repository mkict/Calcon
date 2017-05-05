import { Component } from '@angular/core';
import { NavController, NavParams,Nav,MenuController, AlertController, LoadingController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import {TabsPage} from '../tabs/tabs';
import { Auth, User} from '@ionic/cloud-angular';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  RegisterForm = RegisterPage;
  Tabs = TabsPage;
  email:string;
  password:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public nav: Nav,public menu: MenuController, public auth: Auth, public user: User, public alertCtrl: AlertController, public loadingCtrl:LoadingController) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.menu.swipeEnable(false);
  }

  doLogin() {
    if(this.email === '' || this.password === '') {
        let alert = this.alertCtrl.create({
          title:'Register Error', 
          subTitle:'All fields are rquired',
          buttons:['OK']
        });
        alert.present();
        return;
      }     
    let loader = this.loadingCtrl.create({
      content: "Logging in..."
    });
    loader.present();
     this.auth.login('basic', {'email':this.email, 'password':this.password}).then(() => {
        console.log('ok i guess?');
        loader.dismissAll();
        this.navCtrl.setRoot(this.Tabs);        
      }, (err) => {
        loader.dismissAll();
        console.log(err.message);

        let errors = '';
        if(err.message === 'UNPROCESSABLE ENTITY') errors += 'Email isn\'t valid.<br/>';
        if(err.message === 'UNAUTHORIZED') errors += 'Password is required.<br/>';

        let alert = this.alertCtrl.create({
          title:'Login Error', 
          subTitle:errors,
          buttons:['OK']
        });
        alert.present();
      });
    }

  gotoRegister() {
    this.nav.setRoot(this.RegisterForm);
  }
}
