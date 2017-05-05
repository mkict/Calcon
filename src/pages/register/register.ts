import { Component } from '@angular/core';
import { NavController, NavParams,Nav,MenuController, AlertController, LoadingController } from 'ionic-angular';
import { UserdetailPage } from '../userdetail/userdetail';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  SubmitForm = UserdetailPage;
  password:string;
  email:string;
  name:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public nav: Nav,public menu: MenuController, public auth: Auth, public user: User, public alertCtrl: AlertController, public loadingCtrl:LoadingController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  goToBmr() {
     if(this.email === '' || this.password === '' || this.name === '') {
        let alert = this.alertCtrl.create({
          title:'Error', 
          subTitle:'All fields are rquired',
          buttons:['OK']
        });
        alert.present();
        return;
      }
     let details: UserDetails = {'email':this.email, 'password':this.password, 'name':this.name};
     console.log(details);
      
      let loader = this.loadingCtrl.create({
        content: "Registering your account..."
      });
      loader.present();

      this.auth.signup(details).then(() => {
        console.log('ok signup');
        this.auth.login('basic', {'email':details.email, 'password':details.password, 'name':this.name}).then(() => {
          loader.dismissAll();
          this.navCtrl.setRoot(this.SubmitForm);
        });

      }, (err:IDetailedError<string[]>) => {
        loader.dismissAll();
        let errors = '';
        let alert = this.alertCtrl.create({
          title:'Register Error', 
          subTitle:errors,
          buttons:['OK']
        });
        alert.present();
      });
  }
}
