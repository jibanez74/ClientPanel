import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  current_user: string;
  is_logged_in: boolean;
  block_registration: boolean = false;

  constructor (
    private _router: Router,
    private _flashMsg: FlashMessagesService,
    private _auth: AuthService,
    private _settings: SettingsService
  ) {}

  ngOnInit () {
    this.block_registration = this._settings.set_settings().block_registration;
    this._auth.get_auth_state().subscribe((res) => {
      if (res) {
        this.is_logged_in = true;
        this.current_user = res.email;
      } else {
        this.is_logged_in = false;
      }
    })
  }

  click_to_logout () {
    this._auth.logout();
    this._flashMsg.show(
      'You have logged out successfully',
      {cssClass: 'alert-success', timeout: 6000}
    );
    this._router.navigate(['/login']);
  }
}