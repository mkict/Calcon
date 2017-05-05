import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MenuDetailPage } from '../menu-detail/menu-detail';
import {FoodList} from '../../providers/food-list'
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
  MenuDetailPage = MenuDetailPage;
  page: Number;
  foodnumber: any;
  beveragenumber: any;
  dessertnumber: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public foodService: FoodList) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }


   openModal(){
    this.navCtrl.parent.select(0);
}
  goToOtherPage(page){
    console.log(page)
    this.navCtrl.push(this.MenuDetailPage,{page:page});
  }

}