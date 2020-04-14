import {Component, OnInit} from '@angular/core';
import { Observable, from} from 'rxjs';
import Accounts from '../../entities/Accounts';
import {getConnection} from 'typeorm';
import Trips from '../../entities/Trips';
import {DataProvider} from '../../services/DataProvider';
import {faTruck} from '@fortawesome/free-solid-svg-icons';
@Component({
    selector: 'app-trips',
    templateUrl: './trips.page.html',
    styleUrls: ['./trips.page.scss'],
})
export class TripsPage implements OnInit {
    public trips$: Observable<Trips[]>;
    public accounts$: Observable<Accounts[]>;
    faTruck = faTruck;
    constructor(private dataProvider: DataProvider) {
    
    }

    // getAccounts(): Observable<Accounts[]> {
    //
    //     return from(getConnection()
    //         .getRepository(Accounts)
    //         .createQueryBuilder('accounts')
    //         .getMany());
    // }

    subscribeTrips() {
        return this.dataProvider.activeAccount.subscribe(data => {
            this.getTrips(data);
        });

    }

    getTrips(accountId) {
        accountId = parseInt(accountId);
        if (accountId !== 0) {
            let query = getConnection()
                .getRepository(Trips)
                .createQueryBuilder('trips');
            console.log(accountId);
            if (accountId !== -1) {
                query = query.where({accountId: accountId});
            }
            this.trips$ = from(query.getMany());
        }
    }

    tripView(id) {
    }

    selectAccount(element) {
        console.log(element);
        console.log(this.dataProvider.activeAccount.getValue());
        if (element.target.value !== this.dataProvider.activeAccount.getValue()) {
            this.dataProvider.updateCurrentAccount(element.target.value);
        }
    }

    loadAccounts() {
        this.accounts$ = this.dataProvider.getAccounts();
    }


    ngOnInit() {
        this.subscribeTrips();
        this.loadAccounts();
        this.getTrips(this.dataProvider.activeAccount.getValue());
    }

}
