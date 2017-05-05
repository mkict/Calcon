import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { CalorieDetailPage } from '../pages/calorie-detail/calorie-detail';
import { StatisticPage } from '../pages/statistic/statistic';
import { ProfilePage } from '../pages/profile/profile';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { MenuPage } from '../pages/menu/menu';
import { BmrPage } from '../pages/bmr/bmr';
import { MenuDetailPage } from '../pages/menu-detail/menu-detail';
import { FoodDetailPage } from '../pages/food-detail/food-detail';
import {TabsPage} from '../pages/tabs/tabs';
import {FoodList} from '../providers/food-list';
import {UserdetailPage} from '../pages/userdetail/userdetail';

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { IonicStorageModule } from '@ionic/storage';
const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '7a1e9eb3'
  }
};

@NgModule({
  declarations: [
    MyApp,
    DashboardPage,
    CalorieDetailPage,
    StatisticPage,
    ProfilePage,
    LoginPage,
    RegisterPage,
    MenuPage,
    BmrPage,
    MenuDetailPage,
    FoodDetailPage,
    TabsPage ,
    UserdetailPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DashboardPage,
    CalorieDetailPage,
    StatisticPage,
    ProfilePage,
    LoginPage,
    RegisterPage,
    MenuPage,
    BmrPage,
    MenuDetailPage,
    FoodDetailPage,
    TabsPage,
    UserdetailPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},FoodList]
})
export class AppModule {}
