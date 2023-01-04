import {Hisse} from "./hisse";
import {Cins} from "../enums/cins";
import {KunyeKucukbas} from "../enums/kunye";
import {KunyeBuyukbas} from "../enums/kunye";
import {Durum} from "../enums/durum";

export interface Kurban {
  id: number;
  resimUrl?: string;
  cins: Cins;
  kunye: KunyeKucukbas | KunyeBuyukbas;
  kupeNo: string;
  kilo: number;
  yas: number;
  fiyat: number;
  durum: Durum;
  kesimSirasi?: number;
  hisse?: Hisse;
}

