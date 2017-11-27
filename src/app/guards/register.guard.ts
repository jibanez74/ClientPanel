import { Injectable, Inject } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { CanActivate, Router } from '@angular/router';

@Injectable ()
export class RegisterGuard implements CanActivate {

  constructor (
    private _router: Router,
    private _settingsServ: SettingsService
  ) {}

  canActivate (): boolean {
    if (this._settingsServ.set_settings().block_registration) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}