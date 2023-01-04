import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {Hisse} from '../models/hisse';
import {Hissedar} from "../models/hissedar";
import {HissedarCreate} from "../models/hissedarCreate";
import {HisseCreate} from "../models/hisseCreate";
import {Kurban} from "../models/kurban";

@Injectable({providedIn: 'root'})
export class HisseService {

    private apiUrl = 'http://localhost:8080/api/v1/hisseler';  // URL to web api

    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    constructor(
        private http: HttpClient) {
    }

    /** GET hisseler from the server */
    getHisseler(): Observable<Hisse[]> {
        return this.http.get<Hisse[]>(this.apiUrl)
            .pipe(
                catchError(this.handleError<Hisse[]>('getHisseler', []))
            );
    }

    /** GET hisse by id. Return `undefined` when id not found */
    getHisseNo404<Data>(id: number): Observable<Hisse> {
        const url = `${this.apiUrl}/?id=${id}`;
        return this.http.get<Hisse[]>(url)
            .pipe(
                map(hisseler => hisseler[0]), // returns a {0|1} element array
                catchError(this.handleError<Hisse>(`getHisse id=${id}`))
            );
    }

    /** GET hisse by id. Will 404 if id not found */
    getHisse(id: number): Observable<Hisse> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<Hisse>(url).pipe(
            catchError(this.handleError<Hisse>(`getHisse id=${id}`))
        );
    }

    /* GET hisseler whose name contains search term */
    hisseAra(term: string): Observable<Hisse[]> {
        if (!term.trim()) {
            // if not search term, return empty hisse array.
            return of([]);
        }
        return this.http.get<Hisse[]>(`${this.apiUrl}/?name=${term}`).pipe(
            catchError(this.handleError<Hisse[]>('hisseAra', []))
        );
    }

    //////// Save methods //////////

    /** POST: add a new hisse to the server */
    addMevcutHissedar(hisseCreate: HisseCreate): Observable<Kurban> {
        return this.http.post<Kurban>(this.apiUrl, hisseCreate, this.httpOptions).pipe(
            catchError(this.handleError<Kurban>('addHisse'))
        );
    }

    addYeniHissedar(kurbanId: number, hissedarCreate: HissedarCreate): Observable<Kurban> {
        return this.http.post<Kurban>(this.apiUrl, {kurbanId, hissedarCreate}, this.httpOptions).pipe(
            catchError(this.handleError<Kurban>('addHisse'))
        );
    }

    /** DELETE: delete the hisse from the server */
    deleteHissedar(hisseId: number): Observable<unknown> {
        const url = `${this.apiUrl}/${hisseId}`;

        return this.http.delete(url, this.httpOptions).pipe(
            catchError(this.handleError('deleteHisse'))
        );
    }

    /** PUT: update the hisse on the server */
    updateHissedar(hisseId: number, hissedarId: number): Observable<Kurban> {
        return this.http.put<Kurban>(this.apiUrl + "/" + hisseId, {hisseId, hissedarId}, this.httpOptions).pipe(
            catchError(this.handleError<Kurban>('updateHisse'))
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


