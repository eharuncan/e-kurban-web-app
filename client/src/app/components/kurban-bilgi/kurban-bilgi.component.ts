import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {Kurban} from '../../models/kurban';
import {KurbanService} from '../../services/kurban.service';
import {KURBAN} from "../../mock-data";
import {Cins} from "../../enums/cins";
import {KunyeBuyukbas, KunyeKucukbas} from "../../enums/kunye";
import {Durum} from "../../enums/durum";

@Component({
    selector: 'app-kurban-bilgi',
    templateUrl: './kurban-bilgi.component.html',
    styleUrls: ['./kurban-bilgi.component.css']
})
export class KurbanBilgiComponent implements OnInit {
    // kurban: Kurban = KURBAN;
    kurban: Kurban = {
        id: 0,
        resimUrl: "",
        cins: Cins.KUCUKBAS,
        kunye: KunyeKucukbas.KOYUN,
        kupeNo: "123",
        kilo: 0,
        yas: 0,
        fiyat: 0,
        durum: Durum.SATISTA,
        kesimSirasi: 0,
        hisseAdedi: 0,
        hisseList: []
    };
    kurbanResimUrl: string = "";
    cinsler: string [] = [];
    kunyeler: string [] = [];

    constructor(
        private route: ActivatedRoute,
        private kurbanService: KurbanService,
        private location: Location
    ) {
    }

    ngOnInit(): void {
        this.getKurban();
    }

    onCinsChange(secilenCins: { value: any; }) {
        if (secilenCins.value === Cins.KUCUKBAS) {
            this.kunyeler = Object.values(KunyeKucukbas);
            if (this.kurban.resimUrl == "") {
                this.kurbanResimUrl = "assets/images/kurban-kucukbas-default.png";
            } else {
                this.kurbanResimUrl = this.kurban.resimUrl || "";
            }
        } else if (secilenCins.value === Cins.BUYUKBAS) {
            this.kunyeler = Object.values(KunyeBuyukbas);
            console.log(this.kurban.resimUrl);
            if (this.kurban.resimUrl == "") {
                console.log("buraya girdi");
                this.kurbanResimUrl = "assets/images/kurban-buyukbas-default.png";
            } else {
                this.kurbanResimUrl = this.kurban.resimUrl || "";
            }
        }
    }

    onResimUrlChange(value: any) {
        if (value == "") {
            if (this.kurban.cins === Cins.KUCUKBAS) {
                this.kurbanResimUrl = "assets/images/kurban-kucukbas-default.png";
            } else if (this.kurban.cins === Cins.BUYUKBAS) {
                this.kurbanResimUrl = "assets/images/kurban-buyukbas-default.png";
            }
        } else {
            this.kurbanResimUrl = value;
            this.kurban.resimUrl = value;
        }
    }

    getKurban(): void {
        // this.kurban = KURBAN;
        const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
        this.kurbanService.getKurban(id)
            .subscribe(kurban => {
                this.kurban = kurban;
                this.change();
            });
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

    change(): void {
        this.cinsler = Object.values(Cins);

        if (this.kurban.cins === Cins.KUCUKBAS) {
            this.kunyeler = Object.values(KunyeKucukbas);
        } else if (this.kurban.cins === Cins.BUYUKBAS) {
            this.kunyeler = Object.values(KunyeBuyukbas);
        }

        if (this.kurban.resimUrl == "") {
            if (this.kurban.cins === Cins.KUCUKBAS) {
                this.kurbanResimUrl = "assets/images/kurban-kucukbas-default.png";
            } else if (this.kurban.cins === Cins.BUYUKBAS) {
                this.kurbanResimUrl = "assets/images/kurban-buyukbas-default.png";
            }
        } else {
            this.kurbanResimUrl = this.kurban.resimUrl || "";
        }
    }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/