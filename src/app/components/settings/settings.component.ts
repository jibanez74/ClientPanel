import { Component, OnInit } from '@angular/core';
import { Settings } from '../../interfaces/Settings';
import { SettingsService } from '../../services/settings.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Route } from '@angular/router/src/config';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings: Settings;

  constructor (
    public _router: Router,
    public _flashMsg: FlashMessagesService,
    public _settings: SettingsService
  ) {}

  ngOnInit () {
    this.settings = this._settings.set_settings();
  }

  onSubmit () {
    this._settings.change_settings(this.settings);
    this._flashMsg.show(
      'Settings have been changed',
      {cssClass: 'alert-warning', timeout: 6000}
    );
    this._router.navigate(['/settings']);
  }
}