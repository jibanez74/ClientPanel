import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/observable';

@Injectable ()
export class AuthGuard implements CanActivate {
  constructor (
    private _router: Router,
    private _auth: AngularFireAuth
  ) {}

  canActivate (): Observable<boolean> {
    return this._auth.authState.map((data) => {
      if (data) {
        return true;
      } else {
        this._router.navigate(['/login']);
        return false;
      }
    });
  }
}