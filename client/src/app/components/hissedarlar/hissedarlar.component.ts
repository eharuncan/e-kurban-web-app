import { Component } from '@angular/core';
import {HISSEDARLAR, KURBANLAR} from "../../mock-data";
import {Hissedar} from "../../models/hissedar";
import {HissedarService} from "../../services/hissedar.service";

@Component({
  selector: 'app-hissedarlar',
  templateUrl: './hissedarlar.component.html',
  styleUrls: ['./hissedarlar.component.css']
})
export class HissedarlarComponent {
  // hissedarlar: Hissedar[] = HISSEDARLAR;
  hissedarlar: Hissedar[] = [];
  dataSource = this.hissedarlar;
  displayedColumns: string[] = ['ad', 'soyad', 'tel', 'islemler'];

  constructor(private hissedarService: HissedarService) {
  }

  getHissedarlar(): void {
    // this.hissedarlar = HISSEDARLAR;
    this.hissedarService.getHissedarlar()
        .subscribe(hissedarlar => this.hissedarlar = hissedarlar);
  }

  delete(hissedar: Hissedar): void {
    this.hissedarlar = this.hissedarlar.filter(h => h !== hissedar);
    this.hissedarService.deleteHissedar(hissedar.id).subscribe();
  }

}
