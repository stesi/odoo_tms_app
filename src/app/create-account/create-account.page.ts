import {Component, OnInit} from '@angular/core';
import {getConnection} from 'typeorm';
import Accounts from '../../entities/Accounts';
import {NavController} from '@ionic/angular';
import {RestService} from '../../services/RestService';
import {Utils} from '../../services/utils';

@Component({
    selector: 'app-create-account',
    templateUrl: './create-account.page.html',
    styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {
    account = {} as any;

    constructor(private router: NavController, private restClient: RestService, private util: Utils) {
    }

    submitCreate() {
        let data = this.account;
        let token = false;
        data.createDate = Date.now();
        this.restClient.getToken(data.url, data.username, data.password).then((result: any) => {
            let body = result.body;
                if (typeof result.result === 'object') {
                    if (typeof result.result.access_token === 'string') {
                        token = result.result.access_token;
                    } else {
                        token = false;
                    }
                }
                if (token !== false) {
                    data.accessToken = token;
                    getConnection()
                        .createQueryBuilder()
                        .insert()
                        .into(Accounts)
                        .values(data)
                        .execute();
                    this.router.navigateRoot('/accounts');
                } else {
                    this.util.presentAlert('Errore', 'Dati errati', ['Ok']);
                }
            }
        );
    }

    ngOnInit() {

    }

}
