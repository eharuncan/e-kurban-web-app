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
export class KurbanEkleComponent implements OnInit{

  newKurban : KurbanCreate = {resimUrl: "assets/images/kurban.jpg", kupeNo: "", cins: Cins.KUCUKBAS, kunye: KunyeKucukbas.KOYUN, fiyat:0, yas:0, kilo: 0}

  cinsler = Object.values(Cins);
  kunyeler: string [] = [];

  constructor(private router: Router, private kurbanService: KurbanService) {
  }

  ngOnInit(): void {
    if (this.newKurban.cins === Cins.KUCUKBAS){
      this.kunyeler = Object.values(KunyeKucukbas);
    }else if (this.newKurban.cins === Cins.BUYUKBAS){
      this.kunyeler = Object.values(KunyeBuyukbas);
    }
  }

  onCinsChange(secilenCins: { value: any; }) {
    if (secilenCins.value === Cins.KUCUKBAS){
      this.kunyeler = Object.values(KunyeKucukbas);
    }else if (secilenCins.value === Cins.BUYUKBAS){
      this.kunyeler = Object.values(KunyeBuyukbas);
    }
  }

  onResimUrlChange(value: any) {
    this.newKurban.resimUrl = value;
  }

  onSubmit(): void {
    this.kurbanService.addKurban(this.newKurban)
        .subscribe(kurban => {
        });
    this.router.navigate(['/kurbanlar']);
  }

}
