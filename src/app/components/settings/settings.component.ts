import { Component, OnInit } from '@angular/core';
import { Settings } from '../../interfaces/Settings';
import { SettingsService } from '../../services/settings.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { shouldCallLifecycleInitHook } from '@angular/core/src/view';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings: Settings;

  constructor (
    private _settings: SettingsService,
    private _router: Router,
    private _flash: FlashMessagesService
  ) {}

  ngOnInit () {
    this.settings = this._settings.get_settings();
  }

  onSubmit () {
    this._settings.change_settings(this.settings);
    this._flash.show(
      'Settings saved!',
      {cssClass: 'alert-success', timeout: 5000}
    );
    this._router.navigate(['/settings']);
  }
}
