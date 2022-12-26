import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Kurban } from '../kurban';
import { KurbanService } from '../kurban.service';

@Component({
  selector: 'app-kurban-detail',
  templateUrl: './kurban-detail.component.html',
  styleUrls: [ './kurban-detail.component.css' ]
})
export class KurbanDetailComponent implements OnInit {
  kurban: Kurban | undefined;

  constructor(
    private route: ActivatedRoute,
    private kurbanService: KurbanService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getKurban();
  }

  getKurban(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.kurbanService.getKurban(id)
      .subscribe(kurban => this.kurban = kurban);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.kurban) {
      this.kurbanService.updateKurban(this.kurban)
        .subscribe(() => this.goBack());
    }
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/