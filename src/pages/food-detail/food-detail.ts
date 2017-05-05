import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import { Storage } from '@ionic/storage';

/*
  Generated class for the FoodDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-food-detail',
  templateUrl: 'food-detail.html'
})
export class FoodDetailPage {
	food: any;
  amount: number = 0;
  timePeriod: string = '';
  time: number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public alertCtrl: AlertController, public loadingCtrl:LoadingController) {
  	this.food = navParams.get('food');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FoodDetailPage');
  }
  addToCalCon(){
    if(this.amount === 0 || this.timePeriod === '') {
        let alert = this.alertCtrl.create({
          title:'Error', 
          subTitle:'All fields are rquired',
          buttons:['OK']
        });
        alert.present();
        return;
      }
    this.time = new Date().getDay();
    var weekday = new Array(7);
    weekday[0] = "su";
    weekday[1] = "mo";
    weekday[2] = "tu";
    weekday[3] = "we";
    weekday[4] = "th";
    weekday[5] = "fr";
    weekday[6] = "sa";
    this.storage.ready().then(() => {
       this.storage.get('foodData').then((val) => {
         var foodData = {'su':{'cal':0,'food':[]},'mo':{'cal':0,'food':[]},'tu':{'cal':0,'food':[]},'we':{'cal':0,'food':[]},'th':{'cal':0,'food':[]},'fr':{'cal':0,'food':[]},'sa':{'cal':0,'food':[]}};
          if(val){
            foodData = val;
          } 
          foodData[weekday[this.time]].food.push({'food':this.food,'amount':this.amount,'timePeriod':this.timePeriod});
          this.storage.set('foodData', foodData).then(()=>{
            this.navCtrl.parent.select(0);
          });
       });
     });
  }
}
