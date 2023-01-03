import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {User} from '../models/user';

@Injectable({providedIn: 'root'})
export class UserService {

    private apiUrl = 'http://localhost:8080/api/v1/users';  // URL to web api

    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    constructor(
        private http: HttpClient) {
    }

    /** GET users from the server */
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl)
            .pipe(
                catchError(this.handleError<User[]>('getUsers', []))
            );
    }

    /** GET user by id. Return `undefined` when id not found */
    getUserNo404<Data>(id: number): Observable<User> {
        const url = `${this.apiUrl}/?id=${id}`;
        return this.http.get<User[]>(url)
            .pipe(
                map(users => users[0]), // returns a {0|1} element array
                catchError(this.handleError<User>(`getUser id=${id}`))
            );
    }

    /** GET user by id. Will 404 if id not found */
    getUser(id: number): Observable<User> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<User>(url).pipe(
            catchError(this.handleError<User>(`getUser id=${id}`))
        );
    }

    /* GET users whose name contains search term */
    userAra(term: string): Observable<User[]> {
        if (!term.trim()) {
            // if not search term, return empty user array.
            return of([]);
        }
        return this.http.get<User[]>(`${this.apiUrl}/?name=${term}`).pipe(
            catchError(this.handleError<User[]>('userAra', []))
        );
    }

    //////// Save methods //////////

    /** POST: add a new user to the server */
    addUser(user: User): Observable<User> {
        return this.http.post<User>(this.apiUrl, user, this.httpOptions).pipe(
            catchError(this.handleError<User>('addUser'))
        );
    }

    /** DELETE: delete the user from the server */
    deleteUser(id: number): Observable<User> {
        const url = `${this.apiUrl}/${id}`;

        return this.http.delete<User>(url, this.httpOptions).pipe(
            catchError(this.handleError<User>('deleteUser'))
        );
    }

    /** PUT: update the user on the server */
    updateUser(user: User): Observable<any> {
        return this.http.put(this.apiUrl, user, this.httpOptions).pipe(
            catchError(this.handleError<any>('updateUser'))
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