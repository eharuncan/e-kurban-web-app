import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {User} from '../models/user';
import {UserLogin} from "../models/userLogin";

@Injectable({providedIn: 'root'})
export class AuthService {

    private apiUrl = 'http://localhost:8080/api/v1/';  // URL to web api

    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    constructor(
        private http: HttpClient) {
    }

    giris(userLogin: UserLogin): Observable<User> {
        // console.log(userLoginDto);
        return this.http.post<User>(this.apiUrl + "giris", userLogin, this.httpOptions).pipe(
            catchError(this.handleError<User>('loginUser'))
        );
    }

    cikis(user: User | undefined): void {
        // console.log(user);
        this.http.post<User>(this.apiUrl + "cikis", user, this.httpOptions).pipe(
            catchError(this.handleError<User>('logoutUser'))
        );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     *
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/