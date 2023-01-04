import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {Kurban} from '../models/kurban';
import {KurbanCreate} from "../models/kurbanCreate";
import {KurbanEdit} from "../models/kurbanEdit";
import {Durum} from "../enums/durum";

@Injectable({providedIn: 'root'})
export class KurbanService {

    private apiUrl = 'http://localhost:8080/api/v1/kurbanlar';  // URL to web api

    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    constructor(
        private http: HttpClient) {
    }

    getKurbanBayraminaKalanGun(): Observable<number> {
        const url = `api/v1/kurban-bayramina-kalan-gun`;
        return this.http.get<number>(url).pipe(
            catchError(this.handleError<number>(`getkurban-bayramina-kalan-gun`))
        );
    }

    /** GET kurbanlar from the server */
    getKurbanlar(): Observable<Kurban[]> {
        return this.http.get<Kurban[]>(this.apiUrl)
            .pipe(
                catchError(this.handleError<Kurban[]>('getKurbanlar', []))
            );
    }

    /** GET kurban by id. Return `undefined` when id not found */
    getKurbanNo404<Data>(id: number): Observable<Kurban> {
        const url = `${this.apiUrl}/?id=${id}`;
        return this.http.get<Kurban[]>(url)
            .pipe(
                map(kurbanlar => kurbanlar[0]), // returns a {0|1} element array
                catchError(this.handleError<Kurban>(`getKurban id=${id}`))
            );
    }

    /** GET kurban by id. Will 404 if id not found */
    getKurban(id: number): Observable<Kurban> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<Kurban>(url).pipe(
            catchError(this.handleError<Kurban>(`getKurban id=${id}`))
        );
    }

    /* GET kurbanlar whose name contains search term */
    kurbanAra(term: string): Observable<Kurban[]> {
        if (!term.trim()) {
            // if not search term, return empty kurban array.
            return of([]);
        }
        return this.http.get<Kurban[]>(`${this.apiUrl}/?kupeNo=${term}`).pipe(
            catchError(this.handleError<Kurban[]>('kurbanAra', []))
        );
    }

    //////// Save methods //////////

    /** POST: add a new kurban to the server */
    addKurban(kurban: KurbanCreate): Observable<Kurban> {
        return this.http.post<Kurban>(this.apiUrl, kurban, this.httpOptions).pipe(
            catchError(this.handleError<Kurban>('addKurban'))
        );
    }

    /** DELETE: delete the kurban from the server */
    deleteKurban(id: number): Observable<Kurban> {
        const url = `${this.apiUrl}/${id}`;

        return this.http.delete<Kurban>(url, this.httpOptions).pipe(
            catchError(this.handleError<Kurban>('deleteKurban'))
        );
    }

    /** PUT: update the kurban on the server */
    updateKurban(kurbanEdit: KurbanEdit): Observable<any> {
        return this.http.put(this.apiUrl + "/" + kurbanEdit.id, kurbanEdit, this.httpOptions).pipe(
            catchError(this.handleError<any>('updateKurban'))
        );
    }

    /** PUT: update the kurban on the server */
    updateKurbanDurum(kurbanId: number, kurbanDurum: Durum): Observable<any> {
        return this.http.put(this.apiUrl + "/" + kurbanId + "/durum?kurbanDurum=" + kurbanDurum, this.httpOptions).pipe(
            catchError(this.handleError<any>('updateKurban'))
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


