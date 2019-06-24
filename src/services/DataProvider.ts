import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {getConnection} from 'typeorm';
import Accounts from '../entities/Accounts';


@Injectable()
export class DataProvider {
    private activeAccount = ''
    constructor() {
    }

    public getAccounts(): Promise<any> {
        return getConnection()
            .getRepository(Accounts)
            .createQueryBuilder('accounts')
            .getMany();
    }

    // async syncAccount(id: number) {
    //     await getConnection()
    //         .getRepository(Accounts)
    //         .createQueryBuilder('accounts')
    //         .where('id= :id', {id: id})
    //         .getOne().then((result: any) => {
    //             this.syncData(result.url, result.accessToken);
    //         });
    //
    // }
    //
    // public syncData(url: string, accessToken: string) {
    //     return this.doCall(url, '/gtms/get', {}, accessToken).then((result: any) => {
    //         console.log(result);
    //     });
    // }
    //
    // public getToken(url: string, login: string, password: string): Promise<any> {
    //     return this.doCall(url, '/api/auth/token', {login: login, password: password});
    //
    //
    // }
    //
    // public doCall(url: string, route: string, params: object = {}, accessToken = ''): Promise<any> {
    //     let headers = new HttpHeaders({
    //         'Content-Type': 'application/json',
    //         'access-token': accessToken
    //     });
    //     return this.http.post(url + route, {params: params}, {headers: headers})
    //         .toPromise();
    //
    //
    // }
}
