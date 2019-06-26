import {Component} from '@angular/core';
import 'reflect-metadata';
import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {createConnection} from 'typeorm';
import Accounts from '../entities/Accounts';
import {RestService} from '../services/RestService';
import {HttpClientModule} from '@angular/common/http';
import {Utils} from '../services/utils';
import {DataProvider} from '../services/DataProvider';
import Trips from '../entities/Trips';
import Stops from '../entities/Stops';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    providers: [RestService, HttpClientModule, Utils, DataProvider]
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
        },
        {
            title: 'Trips',
            url: '/trips',
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
                    Trips,
                    Accounts,
                    Stops

                ],
            });
        });


    }
}
