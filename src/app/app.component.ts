import { Component } from '@angular/core';
import 'reflect-metadata';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { createConnection } from 'typeorm';
import { Accounts } from '../entities/Accounts';
import {RestService} from '../services/RestService';
import {HttpClientModule} from '@angular/common/http';
import { Utils } from '../services/utils';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  providers: [RestService, HttpClientModule, Utils]
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Accounts',
      url: '/accounts',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.platform.ready().then(async () => {
      // Running on device or emulator
      await createConnection({
        type: 'cordova',
        database: 'test',
        location: 'default',
        logging: ['error', 'query', 'schema'],
        synchronize: true,
        entities: [
          Accounts
        ],
      });
    });


  }
}
