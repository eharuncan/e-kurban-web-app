import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

import {AppComponent} from './app.component';
import {AnasayfaComponent} from './components/anasayfa/anasayfa.component';
import {KurbanBilgiComponent} from './components/kurban-bilgi/kurban-bilgi.component';
import {KurbanlarComponent} from './components/kurbanlar/kurbanlar.component';
import {KurbanAraComponent} from './components/kurban-ara/kurban-ara.component';
import {GirisComponent} from './components/giris/giris.component';
import {KurbanEkleComponent} from './components/kurban-ekle/kurban-ekle.component';
import {HissedarlarComponent} from './components/hissedarlar/hissedarlar.component';
import {HissedarAraComponent} from './components/hissedar-ara/hissedar-ara.component';
import {HissedarEkleComponent} from './components/hissedar-ekle/hissedar-ekle.component';
import {MatInputModule} from "@angular/material/input";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatTableModule} from "@angular/material/table";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import { HissedarDuzenleComponent } from './components/hissedar-duzenle/hissedar-duzenle.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatSidenavModule,
        MatTableModule,
        MatRadioModule,
        MatSelectModule,
        MatGridListModule,
        MatCardModule,
        MatDialogModule,
    ],
    declarations: [
        AppComponent,
        GirisComponent,
        AnasayfaComponent,
        KurbanlarComponent,
        KurbanAraComponent,
        KurbanEkleComponent,
        KurbanBilgiComponent,
        HissedarlarComponent,
        HissedarAraComponent,
        HissedarEkleComponent,
        HissedarDuzenleComponent,
    ],
    providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}


