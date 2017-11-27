import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { reject } from 'q';

@Injectable()
export class AuthService {

  constructor(private _auth: AngularFireAuth) { }

  login (
    email: string, passwd: string
  ) {
    return new Promise((resolve, reject) => {
      this._auth.auth.signInWithEmailAndPassword(email, passwd).then(
        userData => resolve(userData),
        err => reject(err)
      );
    });
  }

  register_user (
    email: string, passwd: string
  ) {
    return new Promise((resolve, reject) => {
      this._auth.auth.createUserWithEmailAndPassword(email, passwd).then(
        userData => resolve(userData),
        err => reject(err)
      )
    });
  }

  logout () {
    this._auth.auth.signOut();
  }

  get_auth_state () {
    return this._auth.authState.map(auth => auth);
  }
}