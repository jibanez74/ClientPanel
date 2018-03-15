import { Injectable } from '@angular/core';
import { Settings } from '../interfaces/Settings';

@Injectable()
export class SettingsService {
  settings: Settings = {
    enable_balance_on_add: true,
    enable_balance_on_edit: true,
    allow_registration: true
  }
  constructor () {
    if (localStorage.getItem('settings') != null) {
      this.settings = JSON.parse(localStorage.getItem('settings'));
    }
  }

  get_settings () {
    return this.settings;
  }

  change_settings (settings: Settings) {
    localStorage.setItem('settings', JSON.stringify(settings));
  }
}