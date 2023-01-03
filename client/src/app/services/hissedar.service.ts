import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {Hissedar} from '../models/hissedar';
import {HissedarCreate} from "../models/hissedarCreate";

@Injectable({providedIn: 'root'})
export class HissedarService {

    private apiUrl = 'http://localhost:8080/api/v1/hissedarlar';  // URL to web api

    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    constructor(
        private http: HttpClient) {
    }

    /** GET hissedarlar from the server */
    getHissedarlar(): Observable<Hissedar[]> {
        return this.http.get<Hissedar[]>(this.apiUrl)
            .pipe(
                catchError(this.handleError<Hissedar[]>('getHissedarlar', []))
            );
    }

    /** GET hissedar by id. Return `undefined` when id not found */
    getHissedarNo404<Data>(id: number): Observable<Hissedar> {
        const url = `${this.apiUrl}/?id=${id}`;
        return this.http.get<Hissedar[]>(url)
            .pipe(
                map(hissedarlar => hissedarlar[0]), // returns a {0|1} element array
                catchError(this.handleError<Hissedar>(`getHissedar id=${id}`))
            );
    }

    /** GET hissedar by id. Will 404 if id not found */
    getHissedar(id: number): Observable<Hissedar> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<Hissedar>(url).pipe(
            catchError(this.handleError<Hissedar>(`getHissedar id=${id}`))
        );
    }

    /* GET hissedarlar whose name contains search term */
    hissedarAra(term: string): Observable<Hissedar[]> {
        if (!term.trim()) {
            // if not search term, return empty hissedar array.
            return of([]);
        }
        return this.http.get<Hissedar[]>(`${this.apiUrl}/?ad=${term}`).pipe(
            catchError(this.handleError<Hissedar[]>('hissedarAra', []))
        );
    }

    //////// Save methods //////////

    /** POST: add a new hissedar to the server */
    addHissedar(hissedarCreate: HissedarCreate): Observable<Hissedar> {
        console.log(hissedarCreate);
        return this.http.post<Hissedar>(this.apiUrl, hissedarCreate, this.httpOptions).pipe(
            catchError(this.handleError<Hissedar>('addHissedar'))
        );
    }

    /** DELETE: delete the hissedar from the server */
    deleteHissedar(id: number): Observable<Hissedar> {
        const url = `${this.apiUrl}/${id}`;

        return this.http.delete<Hissedar>(url, this.httpOptions).pipe(
            catchError(this.handleError<Hissedar>('deleteHissedar'))
        );
    }

    /** PUT: update the hissedar on the server */
    updateHissedar(hissedar: Hissedar): Observable<any> {
        return this.http.put(this.apiUrl + "/" + hissedar.id, hissedar, this.httpOptions).pipe(
            catchError(this.handleError<any>('updateHissedar'))
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