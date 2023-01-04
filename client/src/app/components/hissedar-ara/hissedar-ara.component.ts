import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Hissedar } from '../../models/hissedar';
import { HissedarService } from '../../services/hissedar.service';

@Component({
  selector: 'app-hissedar-ara',
  templateUrl: './hissedar-ara.component.html',
  styleUrls: [ './hissedar-ara.component.css' ]
})
export class HissedarAraComponent implements OnInit {
  hissedarlar$!: Observable<Hissedar[]>;
  private searchTerms = new Subject<string>();

  constructor(private hissedarService: HissedarService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.hissedarlar$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.hissedarService.hissedarAra(term)),
    );
  }
}


