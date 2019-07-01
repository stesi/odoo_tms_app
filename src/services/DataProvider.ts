import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {getConnection} from 'typeorm';
import Accounts from '../entities/Accounts';
import {BehaviorSubject, from, Observable, Subject} from 'rxjs';
import Settings from '../entities/Settings';


@Injectable()
export class DataProvider {
    public activeAccount = new BehaviorSubject<number>(0);
    public activeAccount$ = this.activeAccount.asObservable();
    private connection;

    constructor() {
        this.connection = getConnection();
        const conditions = {name: 'activeAccount'};
        const activeAccount = this.connection.getRepository(Settings).findOne(conditions).then((out: any) => {
            let value = -1;
            console.log(value);
            if (out !== undefined) {
                if (out.IntegerValue > 0) {
                    value = out.IntegerValue;
                }
            }
            this.activeAccount.next(value);
        });


    }

    public updateCurrentAccount(newVal: number) {

        this.connection.getRepository(Settings).save({name: 'activeAccount', IntegerValue: newVal});
        this.activeAccount.next(newVal);
    }


    public getAccounts(): Observable<any> {
        return from(getConnection()
            .getRepository(Accounts)
            .createQueryBuilder('accounts')
            .getMany());
    }


}
