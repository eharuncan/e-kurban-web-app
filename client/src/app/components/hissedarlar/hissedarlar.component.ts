import {Component, OnInit} from '@angular/core';
import {HISSEDARLAR, KURBANLAR} from "../../mock-data";
import {Hissedar} from "../../models/hissedar";
import {HissedarService} from "../../services/hissedar.service";

@Component({
  selector: 'app-hissedarlar',
  templateUrl: './hissedarlar.component.html',
  styleUrls: ['./hissedarlar.component.css']
})
export class HissedarlarComponent implements OnInit{
  // hissedarlar: Hissedar[] = HISSEDARLAR;
  dataSource: Hissedar[] = [];
  displayedColumns: string[] = ['ad', 'soyad', 'tel', 'islemler'];

  constructor(private hissedarService: HissedarService) {
  }

  ngOnInit(): void {
    this.getHissedarlar();
  }

  getHissedarlar(): void {
    // this.hissedarlar = HISSEDARLAR;
    this.hissedarService.getHissedarlar()
        .subscribe(hissedarlar => this.dataSource = hissedarlar);
  }

  delete(hissedar: Hissedar): void {
    this.dataSource = this.dataSource.filter(h => h !== hissedar);
    this.hissedarService.deleteHissedar(hissedar.id).subscribe();
  }

}
