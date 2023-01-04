import {Component, OnInit} from '@angular/core';
import {Kurban} from '../../models/kurban';
import {KurbanService} from '../../services/kurban.service';
import {Cins} from "../../enums/cins";
import {KunyeBuyukbas, KunyeKucukbas} from "../../enums/kunye";
import {MatSelect} from "@angular/material/select";
import {KurbanCreate} from "../../models/kurbanCreate";
import {Router} from "@angular/router";

@Component({
    selector: 'app-kurban-ekle',
    templateUrl: './kurban-ekle.component.html',
    styleUrls: ['./kurban-ekle.component.css']
})
export class KurbanEkleComponent implements OnInit {

    newKurban: KurbanCreate = {
        resimUrl: "",
        kupeNo: "",
        cins: Cins.KUCUKBAS,
        kunye: KunyeKucukbas.KOYUN,
        fiyat: 0,
        yas: 0,
        kilo: 0
    }
    newKurbanResimUrl: string = "assets/images/kurban-kucukbas-default.png";

    cinsler = Object.values(Cins);
    kunyeler: string [] = [];

    constructor(private router: Router, private kurbanService: KurbanService) {
    }

    ngOnInit(): void {
        if (this.newKurban.cins === Cins.KUCUKBAS) {
            this.kunyeler = Object.values(KunyeKucukbas);
        } else if (this.newKurban.cins === Cins.BUYUKBAS) {
            this.kunyeler = Object.values(KunyeBuyukbas);
        }
    }

    onCinsChange(secilenCins: { value: any; }) {
        if (secilenCins.value === Cins.KUCUKBAS) {
            this.kunyeler = Object.values(KunyeKucukbas);
            if (this.newKurban.resimUrl == "") {
                this.newKurbanResimUrl = "assets/images/kurban-kucukbas-default.png";
            } else {
                this.newKurbanResimUrl = this.newKurban.resimUrl || "";
            }
        } else if (secilenCins.value === Cins.BUYUKBAS) {
            this.kunyeler = Object.values(KunyeBuyukbas);
            if (this.newKurban.resimUrl == "") {
                this.newKurbanResimUrl = "assets/images/kurban-buyukbas-default.png";
            } else {
                this.newKurbanResimUrl = this.newKurban.resimUrl || "";
            }
        }
    }

    onResimUrlChange(value: any) {
        if (value == "") {
            if (this.newKurban.cins === Cins.KUCUKBAS) {
                this.newKurbanResimUrl = "assets/images/kurban-kucukbas-default.png";
            } else if (this.newKurban.cins === Cins.BUYUKBAS) {
                this.newKurbanResimUrl = "assets/images/kurban-buyukbas-default.png";
            }
        } else {
            this.newKurbanResimUrl = value;
            this.newKurban.resimUrl = value;
        }
    }

    onSubmit(): void {
        this.kurbanService.addKurban(this.newKurban)
            .subscribe(kurban => {
              this.router.navigate(['/kurbanlar']);
            });
    }

}
