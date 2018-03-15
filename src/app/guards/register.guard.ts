import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SettingsService } from '../services/settings.service';

@Injectable ()
export class RegisterGuard implements CanActivate {
  constructor (
    private _settings: SettingsService,
    private _router: Router
  ) {}

  canActivate (): boolean {
    if (this._settings.get_settings().allow_registration) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}