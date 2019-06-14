import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable()
export class RestService {
    private headers: HttpHeaders;
    private url: string;
    private login: string;
    private password: string;

    constructor(private http: HttpClient) {
        this.http = http;
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json'

        });
    }

    public getToken(url: string, login: string, password: string): Promise<any> {

      return  this.http.post(url + '/api/auth/token', {params: {login: login, password: password}}, {
            headers: this.headers
        }).toPromise();


    }
}
