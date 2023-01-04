import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {Injectable} from '@angular/core';
import {User} from "./models/user";
import {AuthService} from "./services/auth.service";
import {Hissedar} from "./models/hissedar";

@Injectable({
  providedIn: 'root'
})

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    path = '';

    constructor(private authService: AuthService, private router: Router) {
        this.router.events.subscribe((val) => {
            this.path = this.router.url;
        });
    }

    title = 'e-Kurban';

    public isAuthenticated = false;
    public currentUser: User | undefined;

    public cikis(): void {
        this.authService.cikis(this.currentUser);
        this.currentUser = undefined;
        this.isAuthenticated = false;
        this.router.navigate(['/giris']);
    }
}


