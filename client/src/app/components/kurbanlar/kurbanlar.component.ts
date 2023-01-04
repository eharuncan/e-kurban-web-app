import {Component, OnInit} from '@angular/core';

import {Kurban} from '../../models/kurban';
import {KurbanService} from '../../services/kurban.service';
import {KURBANLAR} from "../../mock-data";
import {Cins} from "../../enums/cins";

@Component({
    selector: 'app-kurbanlar',
    templateUrl: './kurbanlar.component.html',
    styleUrls: ['./kurbanlar.component.css']
})
export class KurbanlarComponent implements OnInit {
    // kurbanlar: Kurban[] = KURBANLAR;
    kurbanlar: Kurban[] = [];
    displayedColumns: string[] = ['kesimSira', 'kupeNo', 'cins', 'kunye', 'kilo', 'yas', 'fiyat', 'durum'];

    constructor(private kurbanService: KurbanService) {
    }

    ngOnInit(): void {
        this.getKurbanlar();
    }

    getKurbanlar(): void {
        // this.kurbanlar = KURBANLAR;
        this.kurbanService.getKurbanlar()
            .subscribe(kurbanlar => this.kurbanlar = kurbanlar);
    }

    delete(kurban: Kurban): void {
        this.kurbanlar = this.kurbanlar.filter(h => h !== kurban);
        this.kurbanService.deleteKurban(kurban.id).subscribe();
    }

    selectTumu(): void {
        this.getKurbanlar();
    }

    selectKucukbas(): void {
        this.getKurbanlar();
        this.kurbanlar = this.kurbanlar.filter(h => h.cins == Cins.KUCUKBAS);
    }

    selectBuyukbas(): void {
        this.getKurbanlar();
        this.kurbanlar = this.kurbanlar.filter(h => h.cins == Cins.BUYUKBAS);
    }

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/