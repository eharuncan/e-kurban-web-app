import {Kurban} from './models/kurban';
import {Cins} from "./enums/cins";
import {KunyeKucukbas} from "./enums/kunye";
import {KunyeBuyukbas} from "./enums/kunye";
import {Durum} from "./enums/durum";
import {Hissedar} from "./models/hissedar";

export const KURBAN: Kurban =
  { id: 1, resimUrl: "/assets/images/kurban.jpg", cins: Cins.BUYUKBAS, kunye: KunyeBuyukbas.OKUZ, kupeNo: "AB123", kilo: 850, yas: 2, fiyat: 14500, durum: Durum.SATISTA, kesimSirasi: 3, hisse: undefined };

export const KURBANLAR: Kurban[] = [
  { id: 1, resimUrl: "/assets/images/kurban.jpg", cins: Cins.BUYUKBAS, kunye: KunyeBuyukbas.OKUZ, kupeNo: "AB123", kilo: 850, yas: 2, fiyat: 14500, durum: Durum.SATISTA, kesimSirasi: 1, hisse: undefined },
  { id: 2, resimUrl: "/assets/images/kurban.jpg", cins: Cins.BUYUKBAS, kunye: KunyeBuyukbas.BOGA, kupeNo: "AB124", kilo: 660, yas: 1, fiyat: 8200, durum: Durum.SATILDI, kesimSirasi: 2, hisse: undefined },
  { id: 3, resimUrl: "/assets/images/kurban.jpg", cins: Cins.KUCUKBAS, kunye: KunyeKucukbas.KOYUN, kupeNo: "AB125", kilo: 40, yas: 2, fiyat: 2200, durum: Durum.SATISTA, kesimSirasi: 3, hisse: undefined },
];

export const HISSEDAR: Hissedar =
  { id: 1, ad: "Ahmet", soyad: "Çelik", tel: "5321234567" };

export const HISSEDARLAR: Hissedar[] = [
  { id: 1, ad: "Ahmet", soyad: "Çelik", tel: "5321234567" },
  { id: 2, ad: "Ayşe", soyad: "Doğan", tel: "5331245621" },
  { id: 3, ad: "Mehmet", soyad: "Kaya", tel: "5551234567" },
];


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/