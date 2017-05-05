import { Component ,ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { Storage } from '@ionic/storage';
import { Auth, User} from '@ionic/cloud-angular';
import { Chart } from 'chart.js';
/*
  Generated class for the Statistic page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-statistic',
  templateUrl: 'statistic.html'
})
export class StatisticPage {
  @ViewChild('barCanvas') barCanvas;
  barChart: any;
  threshold:number = 0;
  day: number = 0;
  calsu: number = 0;
  calmo: number = 0;
  caltu: number = 0;
  calwe: number = 0;
  calth: number = 0;
  calfr: number = 0;
  calsa: number = 0;
  cal: number = 0;
  calpast: number = 0;
  calReduce: number = 0;
  dashboard = DashboardPage
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage, public auth: Auth, public user: User) {}
  ionViewWillEnter(){
    this.cal = 0;
    this.threshold = this.user.get('bmr',0);
    this.threshold = this.threshold*7;
    this.storage.ready().then(() => {
      this.storage.get('foodData').then((foodData) => {
        if(foodData){
          var time = new Date().getDay();
        var yesterday;
        if(time !== 0){
          yesterday = time-1;
        }else{
          yesterday = 6;
        }
         var weekday = new Array(7);
         weekday[0] = "su";
         weekday[1] = "mo";
         weekday[2] = "tu";
         weekday[3] = "we";
         weekday[4] = "th";
         weekday[5] = "fr";
         weekday[6] = "sa";
         this.calsu = foodData.su.cal;
         this.calmo = foodData.mo.cal;
         this.caltu = foodData.tu.cal;
         this.calwe = foodData.we.cal; 
         this.calth = foodData.th.cal;
         this.calfr = foodData.fr.cal; 
         this.calsa = foodData.sa.cal; 
         this.cal = foodData[weekday[time]].cal;
         this.calpast = foodData[weekday[yesterday]].cal;
         this.calReduce = this.calpast-this.cal;
        }
        this.barChart = new Chart(this.barCanvas.nativeElement, {
 
            type: 'bar',
            data: {
                labels: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                datasets: [{
                    label: '# of Votes',
                    data: [this.calsu, this.calmo, this.caltu, this.calwe, this.calth, this.calfr, this.calsa],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(75, 192, 192, 0.2)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
 
        });
      });
       
     });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatisticPage');
  }
  
   openModal(){
    this.navCtrl.parent.select(0);
  }

}
