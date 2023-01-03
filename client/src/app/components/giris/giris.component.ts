import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, Validators} from "@angular/forms";
import {AppComponent} from "../../app.component";
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user";
import {HissedarCreate} from "../../models/hissedarCreate";
import {UserLogin} from "../../models/userLogin";

@Component({
    selector: 'app-giris',
    templateUrl: './giris.component.html',
    styleUrls: ['./giris.component.css']
})

export class GirisComponent {

    constructor(private authService: AuthService, private router: Router, private appComponent: AppComponent) {
    }

    loginUser : UserLogin = {"eposta": "", "sifre": ""}
    passwordHide = true;

    public onSubmit(): void {
        this.authService.giris({"eposta": this.loginUser.eposta, "sifre": this.loginUser.sifre}).subscribe(currentUser => this.appComponent.currentUser = currentUser);
        this.appComponent.isAuthenticated = true;
        this.router.navigate(['/anasayfa']);
    }
}