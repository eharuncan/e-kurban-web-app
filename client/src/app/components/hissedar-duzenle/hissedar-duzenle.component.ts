import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {KurbanService} from "../../services/kurban.service";
import {Location} from "@angular/common";
import {HissedarService} from "../../services/hissedar.service";
import {Kurban} from "../../models/kurban";
import {HISSEDAR, KURBAN} from "../../mock-data";
import {Hissedar} from "../../models/hissedar";
import {HissedarCreate} from "../../models/hissedarCreate";

@Component({
  selector: 'app-hissedar-duzenle',
  templateUrl: './hissedar-duzenle.component.html',
  styleUrls: ['./hissedar-duzenle.component.css']
})
export class HissedarDuzenleComponent implements OnInit{

  editHissedar : Hissedar = {"id": 0, "ad": "", "soyad": "", "tel": ""};

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private hissedarService: HissedarService,
  ) {}

  ngOnInit(): void {
    this.getHissedar();
  }

  getHissedar(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.hissedarService.getHissedar(id)
        .subscribe(hissedar => this.editHissedar = hissedar);
  }

  public onSubmit(): void {
    // console.log(this.newHissedar.ad);
    this.hissedarService.updateHissedar(this.editHissedar)
        .subscribe();
    this.router.navigate(['/hissedarlar']);
  }

}
