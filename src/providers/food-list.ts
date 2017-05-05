import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the FoodList provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FoodList {
	data: any;
	allFood: Number;
	food: Number;
	beverage: Number;
	dessert: Number;
  constructor(public http: Http) {
  	this.data = null;
    console.log('Hello FoodList Provider');
  }

  getAllFoods(){
    return new Promise(resolve => {
 
      this.http.get('https://calcon.herokuapp.com/api/foods')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

    getFoods(){
    return new Promise(resolve => {
 
      this.http.get('https://calcon.herokuapp.com/api/foods/food')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

    getBeverage(){
    return new Promise(resolve => {
 
      this.http.get('https://calcon.herokuapp.com/api/foods/beverage')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

    getDessert(){
    return new Promise(resolve => {
 
      this.http.get('https://calcon.herokuapp.com/api/foods/dessert')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

}
