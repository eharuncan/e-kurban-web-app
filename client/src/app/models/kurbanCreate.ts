import {Cins} from "../enums/cins";
import {KunyeKucukbas} from "../enums/kunye";
import {KunyeBuyukbas} from "../enums/kunye";

export interface KurbanCreate {
    resimUrl?: string;
    cins: Cins;
    kunye: KunyeKucukbas | KunyeBuyukbas;
    kupeNo: string;
    kilo: number;
    yas: number;
    fiyat: number;
}


