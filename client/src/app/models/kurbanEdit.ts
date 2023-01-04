import {Cins} from "../enums/cins";
import {KunyeKucukbas} from "../enums/kunye";
import {KunyeBuyukbas} from "../enums/kunye";
import {Hisse} from "./hisse";

export interface KurbanEdit {
    id: number;
    resimUrl?: string;
    cins: Cins;
    kunye: KunyeKucukbas | KunyeBuyukbas;
    kupeNo: string;
    kilo: number;
    yas: number;
    fiyat: number;
    hisseList?: Hisse[];
}


