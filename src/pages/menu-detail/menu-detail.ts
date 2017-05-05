import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FoodDetailPage } from '../food-detail/food-detail';
import {FoodList} from '../../providers/food-list'
/*
  Generated class for the MenuDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-menu-detail',
  templateUrl: 'menu-detail.html'
})
export class MenuDetailPage {
  Foods: any;
  page: number;
  FoodDetailPage = FoodDetailPage;
  constructor(public navCtrl: NavController, public navParams: NavParams,public foodService: FoodList, public loadingCtrl:LoadingController) {
    this.page = navParams.get("page");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuDetailPage');
    let loader = this.loadingCtrl.create({
        content: "Load foods..."
      });
     loader.present();
    if(this.page==0){
      this.foodService.getFoods().then((data)=>{
      this.Foods = data;
      loader.dismissAll();
    })
    }
    if(this.page==1){
      this.foodService.getBeverage().then((data)=>{
      this.Foods = data;
      loader.dismissAll();
    })
    }
    if(this.page==2){
      this.foodService.getDessert().then((data)=>{
      this.Foods = data;
      loader.dismissAll();
    })
    }
  }

  goToOtherPage(food){
    this.navCtrl.push(this.FoodDetailPage,{food:food});
  }
}