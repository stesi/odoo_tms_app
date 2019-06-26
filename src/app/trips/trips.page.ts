import {Component, OnInit} from '@angular/core';
import {from, Observable} from 'rxjs';
import Accounts from '../../entities/Accounts';
import {getConnection} from 'typeorm';
import Trips from '../../entities/Trips';

@Component({
    selector: 'app-trips',
    templateUrl: './trips.page.html',
    styleUrls: ['./trips.page.scss'],
})
export class TripsPage implements OnInit {
    public trips$: Observable<Trips[]>;

    constructor() {
    }

    getTrips(): Observable<Trips[]> {

        return from(getConnection()
            .getRepository(Trips)
            .createQueryBuilder('trips')
            .getMany());
    }

    ngOnInit() {
        this.trips$ = this.getTrips();
    }

}
