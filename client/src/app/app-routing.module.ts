import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {GirisComponent} from "./components/giris/giris.component";
import {AnasayfaComponent} from './components/anasayfa/anasayfa.component';
import {KurbanlarComponent} from './components/kurbanlar/kurbanlar.component';
import {KurbanEkleComponent} from "./components/kurban-ekle/kurban-ekle.component";
import {KurbanBilgiComponent} from './components/kurban-bilgi/kurban-bilgi.component';
import {HissedarlarComponent} from "./components/hissedarlar/hissedarlar.component";
import {HissedarEkleComponent} from "./components/hissedar-ekle/hissedar-ekle.component";
import {HissedarDuzenleComponent} from "./components/hissedar-duzenle/hissedar-duzenle.component";

const routes: Routes = [
    {path: '', redirectTo: '/giris', pathMatch: 'full'},
    {path: 'giris', component: GirisComponent},
    {path: 'anasayfa', component: AnasayfaComponent},
    {path: 'kurbanlar', component: KurbanlarComponent},
    {path: 'kurban-ekle', component: KurbanEkleComponent},
    {path: 'kurbanlar/:id', component: KurbanBilgiComponent},
    {path: 'hissedarlar', component: HissedarlarComponent},
    {path: 'hissedarlar/:id', component: HissedarDuzenleComponent},
    {path: 'hissedar-ekle', component: HissedarEkleComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}


