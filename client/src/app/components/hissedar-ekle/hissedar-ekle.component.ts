import { Component } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AppComponent} from "../../app.component";
import {HissedarService} from "../../services/hissedar.service";
import {HissedarCreate} from "../../models/hissedarCreate";

@Component({
  selector: 'app-hissedar-ekle',
  templateUrl: './hissedar-ekle.component.html',
  styleUrls: ['./hissedar-ekle.component.css']
})
export class HissedarEkleComponent {

  newHissedar : HissedarCreate = {"ad": "", "soyad": "", "tel": ""}

  constructor(private hissedarService: HissedarService, private router: Router, private appComponent: AppComponent) {
  }

  public onSubmit(): void {
    // console.log(this.newHissedar.ad);
    this.hissedarService.addHissedar({"ad": this.newHissedar.ad, "soyad": this.newHissedar.soyad, "tel": this.newHissedar.tel})
        .subscribe(hissedar => {
          this.appComponent.hissedarlar.push(hissedar);
        });
    this.router.navigate(['/hissedarlar']);
  }
}
