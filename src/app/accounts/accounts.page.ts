import {Component, OnInit} from '@angular/core';
import {Accounts} from '../../entities/Accounts';
import {getConnection} from 'typeorm';
import {from, Observable} from 'rxjs';

@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.page.html',
    styleUrls: ['./accounts.page.scss'],
})
export class AccountsPage implements OnInit {
    accounts$: Observable<Accounts[]>;

    constructor() {
    }

    getAccounts(): Observable<Accounts[]> {

        return from(getConnection()
            .getRepository(Accounts)
            .createQueryBuilder('accounts')
            .getMany());
    }

    dblClickAccount(id) {
        getConnection()
            .getRepository(Accounts)
            .createQueryBuilder('accounts')
            .delete()
            .where('id= :id', {id: id})
            .execute().then(result => {
            this.accounts$ = this.getAccounts();
        });
    }

    ngOnInit() {
        this.accounts$ = this.getAccounts();
    }
}
