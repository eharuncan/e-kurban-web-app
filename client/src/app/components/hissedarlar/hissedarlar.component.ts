import { Component } from '@angular/core';
import {HISSEDARLAR, KURBANLAR} from "../../mock-data";
import {Hissedar} from "../../models/hissedar";
import {HissedarService} from "../../services/hissedar.service";
import {Router} from "@angular/router";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-hissedarlar',
  templateUrl: './hissedarlar.component.html',
  styleUrls: ['./hissedarlar.component.css']
})
export class HissedarlarComponent {
  // hissedarlar: Hissedar[] = HISSEDARLAR;
  dataSource = this.appComponent.hissedarlar;
  displayedColumns: string[] = ['ad', 'soyad', 'tel', 'islemler'];

  constructor(private hissedarService: HissedarService, private appComponent: AppComponent) {
  }

  getHissedarlar(): void {
    // this.hissedarlar = HISSEDARLAR;
    this.hissedarService.getHissedarlar()
        .subscribe(hissedarlar => this.appComponent.hissedarlar = hissedarlar);
  }

  delete(hissedar: Hissedar): void {
    this.appComponent.hissedarlar = this.appComponent.hissedarlar.filter(h => h !== hissedar);
    this.hissedarService.deleteHissedar(hissedar.id).subscribe();
  }

}
