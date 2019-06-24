import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {getConnection} from 'typeorm';
import Accounts from '../entities/Accounts';
import {forEach} from '@angular-devkit/schematics';
import Trips from '../entities/Trips';


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
        return this.doCall(accountId.url, '/gtms/get', {}, accountId.accessToken).then((result: any) => {
            let repository = connection.getRepository(Trips);
            for (let trip   of result.result.data) {
                var item: any;
                trip.accountId = accountId;
                const conditions = {accountId: accountId, externalId: trip.externalId};
                const tripDb = repository.findOne(conditions).then((out: any) => {
                    if (out === undefined) {
                        item = repository.insert(trip);
                    } else {
                        item = repository.update(conditions, trip);

                    }
                });

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


            }
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
