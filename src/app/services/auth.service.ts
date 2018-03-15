//this file/service is responsable for user auth 
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  constructor (private _fireAuth: AngularFireAuth) {}

  //simple function for sign in
  login (email: string, password: string) {
    return new Promise((resolve, reject) => {
     this._fireAuth.auth.signInWithEmailAndPassword(email, password).then(
       user_data => resolve(user_data),
       err => reject(err)
     );
    });
  }

  //checks user status - meaning if loggedin or not
  get_auth () {
    return this._fireAuth.authState.map(auth => auth);
  }

  //logout function
  logout () {
    this._fireAuth.auth.signOut();
  }

  //add new user to firebase - in other words register
  register (email: string, password: string) {
    return new Promise((resolve, reject) => {
      this._fireAuth.auth.createUserWithEmailAndPassword(email, password).then(
        user_data => resolve(user_data),
        err => reject(err) 
      );
    });
  }
}