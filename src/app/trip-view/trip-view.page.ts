import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {from, Observable} from 'rxjs';
import Trips from '../../entities/Trips';
import Stops from '../../entities/Stops';
import {getConnection, Repository} from 'typeorm';
import Accounts from '../../entities/Accounts';
import { faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
@Component({
    selector: 'app-trip-view',
    templateUrl: './trip-view.page.html',
    styleUrls: ['./trip-view.page.scss'],
})
export class TripViewPage implements OnInit {
    public trip$: Observable<Trips>;
    private currentAccountId: number;
    private currentTripId: number;
    private repositoryTrips: Repository<Trips>;
    faMapMarkerAlt = faMapMarkerAlt
    constructor(private route: ActivatedRoute,
                private router: Router) {
        this.currentAccountId = parseInt(this.route.snapshot.paramMap.get('accountId'))
        this.currentTripId = parseInt(this.route.snapshot.paramMap.get('externalId'))
        this.repositoryTrips = getConnection().getRepository(Trips);
    }

    getTrip(): Observable<Trips> {
        return from(this.repositoryTrips.findOne({accountId: this.currentAccountId, externalId: this.currentTripId},{'relations':['stops']}) );
    }

    ngOnInit() {
        this.trip$ = this.getTrip();
    }

}
