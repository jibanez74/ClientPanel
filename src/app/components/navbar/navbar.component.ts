import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Client } from '../../interfaces/Client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from '../../services/settings.service';
import { Settings } from '../../interfaces/Settings';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user_is_auth: boolean;
  allow_registration: boolean;

  constructor (
    private _settings: SettingsService,
    private _auth: AuthService,
    private _router: Router,
    private _flash: FlashMessagesService
  ) {}

  ngOnInit () {
    this.allow_registration = this._settings.get_settings().allow_registration;
    this._auth.get_auth().subscribe((data) => {
      //data is simply a true or false value coming from firestore
      //if its true user is logged in, else is false and user is not logged in
      if (data) {
        this.user_is_auth = true;
      } else {
        this.user_is_auth = false;
      }
    });
  }

  signOut () {
    this._auth.logout();
    this._flash.show(
      'You have successfully logged out',
      {cssClass: 'alert-success', timeout: 5000}
    );
    this._router.navigate(['/login']);
  }
}