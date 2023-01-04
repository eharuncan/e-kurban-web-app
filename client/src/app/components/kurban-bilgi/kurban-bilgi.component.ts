import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Kurban} from '../../models/kurban';
import {KurbanService} from '../../services/kurban.service';
import {Cins} from "../../enums/cins";
import {KunyeBuyukbas, KunyeKucukbas} from "../../enums/kunye";
import {Durum} from "../../enums/durum";
import {KurbanEdit} from "../../models/kurbanEdit";
import {HisseService} from "../../services/hisse.service";
import {HissedarCreate} from "../../models/hissedarCreate";
import {HisseCreate} from "../../models/hisseCreate";

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
    kurbanEdit: KurbanEdit = {
        id: 0,
        resimUrl: "",
        cins: Cins.KUCUKBAS,
        kunye: KunyeKucukbas.KOYUN,
        kupeNo: "123",
        kilo: 0,
        yas: 0,
        fiyat: 0,
        hisseList: []
    };
    hissedarCreate: HissedarCreate = {
        ad: "hissedar",
        soyad: "test",
        tel: "05321234567"
    };
    hisseCreate: HisseCreate = {
        kurbanId: 4,
        hissedarId: 3
    }
    kurbanResimUrl: string = "";
    cinsler: string [] = [];
    kunyeler: string [] = [];
    islemDurumu: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private kurbanService: KurbanService,
        private hisseService: HisseService
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
            if (this.kurban.resimUrl == "") {
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

    refreshViews(): void {
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

        this.islemDurumu = this.kurban.durum === Durum.SATILDI || this.kurban.durum === Durum.SATISTA;
    }

    getKurban(): void {
        // this.kurban = KURBAN;
        const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
        this.kurbanService.getKurban(id)
            .subscribe(kurban => {
                this.kurban = kurban;
                this.kurbanEdit = kurban;
                this.refreshViews();
            });
    }

    save(): void {
        if (this.kurban) {
            this.kurbanService.updateKurban(this.kurbanEdit)
                .subscribe(updatedKurban => {
                    this.kurban = updatedKurban;
                    this.router.navigate(['/kurbanlar']);
                });
        }
    }

    mevcutHissedarEkle(kurbanId: number): void {
        this.hisseCreate.kurbanId = kurbanId;
        this.hisseCreate.hissedarId = 1;
        this.hisseService.addMevcutHissedar(this.hisseCreate)
            .subscribe(updatedKurban => {
                this.kurban = updatedKurban;
            });
    }

    yeniHissedarEkle(kurbanId: number): void {
        this.hisseService.addYeniHissedar(kurbanId, this.hissedarCreate)
            .subscribe(updatedKurban => {
                this.kurban = updatedKurban;
            });
    }

    hissedarDuzenle(hisseId: number): void {
        this.hisseService.updateHissedar(hisseId, this.hisseCreate)
            .subscribe(updatedKurban => {
                this.kurban = updatedKurban;
            });
    }

    hissedarKaldir(hisseId: number): void {
        this.hisseService.deleteHissedar(hisseId)
            .subscribe();
        this.kurban.hisseList = this.kurban.hisseList.filter(h => h.id !== hisseId);
    }

    updateKurbanDurumKesildi(kurbanId: number): void {
        this.kurbanService.updateKurbanDurum(kurbanId, Durum.KESILDI)
            .subscribe(updatedKurban => {
                this.kurban = updatedKurban;
                this.refreshViews();
            });
    }

    updateKurbanDurumTelef(kurbanId: number): void {
        this.kurbanService.updateKurbanDurum(kurbanId, Durum.TELEF)
            .subscribe(updatedKurban => {
                this.kurban = updatedKurban;
                this.refreshViews();
            });
    }
}


