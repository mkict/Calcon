import { Component,ViewChild } from '@angular/core';
import { Nav,Platform} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import {LoginPage} from '../pages/login/login';
import {ProfilePage} from '../pages/profile/profile';
import { Auth } from '@ionic/cloud-angular';
import { Storage } from '@ionic/storage';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage;
  profile = ProfilePage
  @ViewChild('mycontent') nav: Nav

  constructor(public platform: Platform, public auth:Auth, public storage:Storage) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      if(this.auth.isAuthenticated()) {
        this.rootPage = TabsPage;
      } else {
        this.rootPage = LoginPage;
      }
    });
  }
  openPage(){
    this.nav.push(this.profile)
  }
  Logout() {
    this.storage.clear();
    this.auth.logout();
    this.nav.setRoot(LoginPage);
  }
}