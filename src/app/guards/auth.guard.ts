import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Route } from '@angular/router/src/config';
import { AngularFireAction } from 'angularfire2/database/interfaces';

@Injectable ()
export class AuthGuard implements CanActivate {
  constructor (
    private _router: Router,
    private _auth: AngularFireAuth
  ) {}

  canActivate (): Observable<boolean> {
    return this._auth.authState.map(auth => {
      if (!auth) {
        this._router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    });
  }
}
