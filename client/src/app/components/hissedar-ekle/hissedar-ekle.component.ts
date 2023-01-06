import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HissedarService} from "../../services/hissedar.service";
import {HissedarCreate} from "../../models/hissedarCreate";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HisseSecimMode} from "../../enums/hisseSecimMode";

export interface DialogData {
  mode: HisseSecimMode;
}

@Component({
  selector: 'app-hissedar-ekle',
  templateUrl: './hissedar-ekle.component.html',
  styleUrls: ['./hissedar-ekle.component.css']
})
export class HissedarEkleComponent implements OnInit{

  newHissedar : HissedarCreate = {"ad": "", "soyad": "", "tel": ""}
  hisseSecimMode: HisseSecimMode = HisseSecimMode.KAPALI;

  constructor(private hissedarService: HissedarService,
              private router: Router,
              public dialogRef: MatDialogRef<HissedarEkleComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit() {
    this.hisseSecimMode = this.data.mode;
  }

  onIptalClick(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    this.hissedarService.addHissedar(this.newHissedar)
        .subscribe(h =>
            this.router.navigate(['/hissedarlar']));
  }
}
