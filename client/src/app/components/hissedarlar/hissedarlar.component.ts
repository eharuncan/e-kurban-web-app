import {Component, Inject, OnInit} from '@angular/core';
import {HISSEDARLAR, KURBANLAR} from "../../mock-data";
import {Hissedar} from "../../models/hissedar";
import {HissedarService} from "../../services/hissedar.service";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface DialogData {
  secilenHissedarId: number;
}

@Component({
    selector: 'app-hissedarlar',
    templateUrl: './hissedarlar.component.html',
    styleUrls: ['./hissedarlar.component.css']
})
export class HissedarlarComponent implements OnInit {
    // hissedarlar: Hissedar[] = HISSEDARLAR;
    hissedarlar: Hissedar[] = [];
    displayedColumns: string[] = ['ad', 'soyad', 'tel', 'islemler'];

    constructor(private hissedarService: HissedarService, public dialogRef: MatDialogRef<HissedarlarComponent>,
                @Inject(MAT_DIALOG_DATA) public data: DialogData,) {
    }

    onIptalClick(): void {
        this.dialogRef.close();
    }

    onHissedarClick(hissedarId: number) {
      this.data.secilenHissedarId = hissedarId;
    }

    ngOnInit(): void {
        this.getHissedarlar();
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
