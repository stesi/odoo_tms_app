import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { getConnection, Repository } from 'typeorm';
import Accounts from '../entities/Accounts';
import { forEach } from '@angular-devkit/schematics';
import Trips from '../entities/Trips';
import Stops from '../entities/Stops';
import Operations from 'src/entities/Operations';
import Loads from 'src/entities/Loads';
import Events from 'src/entities/Events';


@Injectable()
export class RestService {
    // private headers: HttpHeaders;
    // private url: string;
    // private route: string;
    // private accessToken = '';
    // private syncInstances = {};
    private syncTaskRunning = false;
    private connection = getConnection();
    private repositoryEvents: Repository<Events> ;
    private repositoryTrips : Repository<Trips>;
    private repositoryStops  : Repository<Stops>;
    private repositoryOperations  : Repository<Operations>;
    private repositoryLoads  : Repository<Loads>;
    constructor(private http: HttpClient) {
        //  this.http = http;
        // this.headers = new HttpHeaders({
        //     'Content-Type': 'application/json'
        //
        // });


        this.connection = getConnection();
        this.repositoryEvents =  this.connection.getRepository(Events);
        this.repositoryTrips =  this.connection.getRepository(Trips);
        this.repositoryStops =  this.connection.getRepository(Stops);
        this.repositoryOperations =  this.connection.getRepository(Operations);
        this.repositoryLoads =  this.connection.getRepository(Loads);
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
            .where('id= :id', { id: id })
            .getOne().then((result: any) => {
                this.syncData(result);
            });

    }

    public async syncData(accountId: Accounts) {

        if (this.syncTaskRunning == false) {
            
            this.syncTaskRunning = true;
            var eventsToSend = await  this.repositoryEvents.find();
            var trips = await this.repositoryTrips.createQueryBuilder("trips").select(["externalId", "createdAt"]).getMany()
            var params = { accountId: accountId.id, events: [] };
            if (eventsToSend.length > 0) {
                params['events'] = eventsToSend;
                params['trips'] = trips;
            }
            return this.doCall(accountId.url, '/gtms/get', params, accountId.accessToken).then(async (result: any) => {
                console.log(result)
                let managedEvents = result.result.data.managedEvents;
                if (managedEvents.length > 0) {
                    await  this.repositoryEvents.delete(managedEvents);
                }
               
                if (typeof result.result.data.trips !== undefined && result.result.data.trips.length > 0) {
                    await  this.repositoryTrips.save(result.result.data.trips);
                }
                if (typeof result.result.data.stops !== undefined && result.result.data.stops.length > 0) {
                    await  this.repositoryStops.save(result.result.data.stops);
                }
                if (typeof result.result.data.operations !== undefined && result.result.data.operations.length > 0) {
                    await  this.repositoryOperations.save(result.result.data.operations);
                }
                if (typeof result.result.data.loads !== undefined && result.result.data.loads.length > 0) {
                    await  this.repositoryLoads.save(result.result.data.loads);
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

            }).finally(() => {
                this.syncTaskRunning = false;
            });
        }
    }

    public getToken(url: string, login: string, password: string): Promise<any> {
        return this.doCall(url, '/api/auth/token', { login: login, password: password });
        // this.http.post(url + '/api/auth/token', {params: {login: login, password: password}}, {
        //     headers: this.headers
        // }).toPromise();


    }

    public doCall(url: string, route: string, params: object = {}, accessToken = ''): Promise<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'access-token': accessToken
        });
        return this.http.post(url + route, { params: params }, { headers: headers })
            .toPromise();


    }
}
