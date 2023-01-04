import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Kurban } from '../../models/kurban';
import { KurbanService } from '../../services/kurban.service';

@Component({
  selector: 'app-kurban-ara',
  templateUrl: './kurban-ara.component.html',
  styleUrls: [ './kurban-ara.component.css' ]
})
export class KurbanAraComponent implements OnInit {
  kurbanlar$!: Observable<Kurban[]>;
  private searchTerms = new Subject<string>();

  constructor(private kurbanService: KurbanService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.kurbanlar$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.kurbanService.kurbanAra(term)),
    );
  }
}


