import { Injectable } from '@angular/core';
import { Settings } from '../interfaces/Settings';

@Injectable()
export class SettingsService {
  settings: Settings = {
    block_registration: true,
    disable_balance_on_add: true,
    disable_balance_on_edit: true
  }

  constructor () {
    if (localStorage.getItem('settings') != null) {
      this.settings = JSON.parse(localStorage.getItem('settings'));
    }
  }

  set_settings () {
    return this.settings;
  }

  change_settings (settings: Settings) {
    localStorage.setItem('settings', JSON.stringify(settings));
  }
}