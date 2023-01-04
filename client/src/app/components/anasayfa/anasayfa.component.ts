import {Component, OnInit} from '@angular/core';
import {Kurban} from '../../models/kurban';
import {KurbanService} from '../../services/kurban.service';
import {KURBANLAR} from "../../mock-data";
import {Cins} from "../../enums/cins";

@Component({
    selector: 'app-anasayfa',
    templateUrl: './anasayfa.component.html',
    styleUrls: ['./anasayfa.component.css']
})
export class AnasayfaComponent implements OnInit {
    kurbanBayraminaKalanGun: number = 0;
    // kurbanlar: Kurban[] = KURBANLAR;
    kurbanlar: Kurban[] = [];
    displayedColumns: string[] = ['kesimSira', 'cins', 'kunye', 'fiyat', 'kalanHisse'];

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

    getKurbanBayraminaKalanGun(): void {
        this.kurbanService.getKurbanBayraminaKalanGun()
            .subscribe(kurbanBayraminaKalanGun => this.kurbanBayraminaKalanGun = kurbanBayraminaKalanGun);
    }

    selectTumu(): void {
        this.getKurbanlar();
    }

    selectKucukbas(): void {
        this.kurbanService.getKurbanlar()
            .subscribe(kurbanlar => {
                this.kurbanlar = kurbanlar.filter(h => h.cins === Cins.KUCUKBAS);
            });
    }

    selectBuyukbas(): void {
        this.kurbanService.getKurbanlar()
            .subscribe(kurbanlar => {
                this.kurbanlar = kurbanlar.filter(h => h.cins === Cins.BUYUKBAS);
            });
    }
}


