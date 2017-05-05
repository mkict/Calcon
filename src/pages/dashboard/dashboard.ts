import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { CalorieDetailPage } from '../calorie-detail/calorie-detail';
import { Auth, User} from '@ionic/cloud-angular';
import { Storage } from '@ionic/storage';
/*
  Generated class for the Dashboard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {
	CaloriePage = CalorieDetailPage;
  bmr: number;
  cal: number = 0;
  morning: number = 0;
  afternoon: number = 0;
  evening: number = 0;
  night: number = 0;
  morningFood: any = [];
  afternoonFood: any = [];
  eveningFood: any = [];
  nightFood: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public menu: MenuController, public auth: Auth, public user: User, public storage: Storage) {
    
  }
  ionViewWillEnter(){
    this.cal = 0;
    this.morning = 0;
    this.afternoon = 0;
    this.evening = 0;
    this.night = 0;
    this.morningFood = [];
    this.afternoonFood= [];
    this.eveningFood= [];
    this.nightFood= [];
    this.storage.ready().then(() => {
       this.storage.get('foodData').then((foodData) => {
         var calDate = {'su':{'cal':0,'food':[]},'mo':{'cal':0,'food':[]},'tu':{'cal':0,'food':[]},'we':{'cal':0,'food':[]},'th':{'cal':0,'food':[]},'fr':{'cal':0,'food':[]},'sa':{'cal':0,'food':[]}};
         var i;
         var time = new Date().getDay();
         var weekday = new Array(7);
         weekday[0] = "su";
         weekday[1] = "mo";
         weekday[2] = "tu";
         weekday[3] = "we";
         weekday[4] = "th";
         weekday[5] = "fr";
         weekday[6] = "sa";
         if(foodData){
           var data = foodData[weekday[time]].food;
           calDate = foodData;
           if(data){
            for (i = 0; i < data.length; i++) {  //loop through the array
                this.cal = this.cal+(data[i].food.Calories*data[i].amount);  //Do the math!
                if(data[i].timePeriod === 'morning'){
                  this.morningFood.push(data[i].food);
                  this.morning = this.morning+(data[i].food.Calories*data[i].amount);
                }else if(data[i].timePeriod === 'afternoon'){
                  this.afternoonFood.push(data[i].food);
                  this.afternoon = this.afternoon+(data[i].food.Calories*data[i].amount);
                }else if(data[i].timePeriod === 'evening'){
                  this.eveningFood.push(data[i].food);
                  this.evening = this.evening+(data[i].food.Calories*data[i].amount);
                }else{
                  this.nightFood.push(data[i].food);
                  this.night = this.night+(data[i].food.Calories*data[i].amount);
                }
            }
            calDate[weekday[time]].cal = this.cal;
              this.storage.set('foodData', calDate).then((foodData)=>{
                console.log(foodData);
            });
            this.storage.set('cal',this.cal);
            this.storage.set('morning',this.morning);
            this.storage.set('afternoon',this.afternoon);
            this.storage.set('evening',this.evening);
            this.storage.set('night',this.night);
          } 
         }
          
       });
     });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
    this.menu.swipeEnable(true);
    this.bmr = this.user.get('bmr',0);
    
  }

/**********************************************************************/
  goToCalDetailPage(Foods,cal,meal) {
    console.log(Foods);
    this.navCtrl.push(this.CaloriePage,{'Foods':Foods,'cal':cal,'meal':meal});
  }
  
    goToDashboardPage(){
    this.navCtrl.parent.select(0);
  }
}
