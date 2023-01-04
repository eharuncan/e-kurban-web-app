import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {Kurban} from '../../models/kurban';
import {KurbanService} from '../../services/kurban.service';
import {KURBAN} from "../../mock-data";
import {Cins} from "../../enums/cins";
import {KunyeBuyukbas, KunyeKucukbas} from "../../enums/kunye";

@Component({
  selector: 'app-kurban-bilgi',
  templateUrl: './kurban-bilgi.component.html',
  styleUrls: [ './kurban-bilgi.component.css' ]
})
export class KurbanBilgiComponent implements OnInit {
  kurban: Kurban = KURBAN;

  constructor(
    private route: ActivatedRoute,
    private kurbanService: KurbanService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getKurban();

    if (this.kurban.cins === Cins.KUCUKBAS){
      this.kunyeler = Object.values(KunyeKucukbas);
    }else if (this.kurban.cins === Cins.BUYUKBAS){
      this.kunyeler = Object.values(KunyeBuyukbas);
    }

    if (this.kurban.resimUrl == ""){
      if(this.kurban.cins === Cins.KUCUKBAS){
        this.kurban.resimUrl = "assets/images/kurban-kucukbas-default.png";
      }else if (this.kurban.cins === Cins.BUYUKBAS){
        this.kurban.resimUrl = "assets/images/kurban-buyukbas-default.png";
      }
    }
  }

  cinsler = Object.values(Cins);
  kunyeler: string [] = [];

  onCinsChange(secilenCins: { value: any; }) {
    if (secilenCins.value === Cins.KUCUKBAS){
      this.kunyeler = Object.values(KunyeKucukbas);
    }else if (secilenCins.value === Cins.BUYUKBAS){
      this.kunyeler = Object.values(KunyeBuyukbas);
    }
  }

  getKurban(): void {
    this.kurban = KURBAN;
    // const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    // this.kurbanService.getKurban(id)
    //   .subscribe(kurban => this.kurban = kurban);
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