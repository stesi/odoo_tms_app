import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {getConnection} from 'typeorm';
import Accounts from '../entities/Accounts';
import {forEach} from '@angular-devkit/schematics';
import Trips from '../entities/Trips';
import Stops from '../entities/Stops';
import Operations from 'src/entities/Operations';


@Injectable()
export class RestService {
    // private headers: HttpHeaders;
    // private url: string;
    // private route: string;
    // private accessToken = '';
    // private syncInstances = {};

    constructor(private http: HttpClient) {
        //  this.http = http;
        // this.headers = new HttpHeaders({
        //     'Content-Type': 'application/json'
        //
        // });
    }

    // public prepare(url: string, accessToken: string) {
    //
    //     this.headers = new HttpHeaders({
    //         'Content-Type': 'application/json',
    //         'access-token': accessToken
    //     });
    // }
    syncAccount(id: number) {
        getConnection()
            .getRepository(Accounts)
            .createQueryBuilder('accounts')
            .where('id= :id', {id: id})
            .getOne().then((result: any) => {
            this.syncData(result);
        });

    }

    public syncData(accountId: Accounts) {
        let connection = getConnection();
        return this.doCall(accountId.url, '/gtms/get', {accountId: accountId.id}, accountId.accessToken).then(async (result: any) => {
            let repositoryTrips = connection.getRepository(Trips);
            let repositoryStops = connection.getRepository(Stops);
            let repositoryOperations = connection.getRepository(Operations);
            if (typeof result.result.data.trips !== undefined && result.result.data.trips.length > 0 ){
                await repositoryTrips.save(result.result.data.trips);
            }
            if (typeof result.result.data.stops !== undefined && result.result.data.stops.length > 0 ){
                await repositoryStops.save(result.result.data.stops);
            }
            if (typeof result.result.data.operations !== undefined && result.result.data.operations.length > 0 ){
                await repositoryOperations.save(result.result.data.operations);
            }
           /*  for (let trip   of result.result.data.trips) {
                var item: any;
                await repositoryTrips.save(trip);
                // trip.accountId.id = accountId.id;
                // const conditions = {accountId: accountId.id, externalId: trip.externalId};
                // const tripDb = repositoryTrips.findOne(conditions).then(async (out: any) => {
                //     if (out === undefined) {
                //         item = await repositoryTrips.insert(trip);
                //     } else {
                //         item = await repositoryTrips.update(conditions, trip);
                //
                //     }
                //     // const id = trip.id;
                //     // const stops = trip.stops;
                //     // for(let stop of stops) {
                //     //     const conditions = {accountId: accountId.id, externalId: stop.externalId};
                //     //     const stopDb = await repositoryStops.findOne(conditions);
                //     //     if (stopDb === undefined) {
                //     //         stop.tripId = trip;
                //     //         item = await repositoryStops.insert(stop);
                //     //     } else {
                //     //         item = await repositoryStops.update(conditions, stop);
                //     //
                //     //     }
                //     // }
                //
                // });


                // item.then(( out: any) => {
                //     console.log(out);
                // });
                // repository.save(returnTrip);
                // connection
                //     .getRepository(Trips)
                //     .createQueryBuilder('trips')
                //     .where('externalId= :id and accountId= :accountId', {externalId: trip.externalId, accountId: accountId.id})
                //     .getOne().then((res: any) => {
                //     console.log(res);
                //     if (typeof res === 'undefined') {
                //         connection
                //             .createQueryBuilder()
                //             .insert()
                //             .into(Trips)
                //             .values(trip)
                //             .execute();
                //     } else {
                //         connection
                //             .createQueryBuilder()
                //             .update(Trips)
                //             .set(trip)
                //             .where('externalId= :id and accountId= :accountId', {externalId: trip.externalId, accountId: accountId.id})
                //             .execute();
                //     }
                // });


            } */
           /*  for (let stop   of result.result.data.stops) {
                await repositoryStops.save(stop);
            } */
        });
    }

    public getToken(url: string, login: string, password: string): Promise<any> {
        return this.doCall(url, '/api/auth/token', {login: login, password: password});
        // this.http.post(url + '/api/auth/token', {params: {login: login, password: password}}, {
        //     headers: this.headers
        // }).toPromise();


    }

    public doCall(url: string, route: string, params: object = {}, accessToken = ''): Promise<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'access-token': accessToken
        });
        return this.http.post(url + route, {params: params}, {headers: headers})
            .toPromise();


    }
}
