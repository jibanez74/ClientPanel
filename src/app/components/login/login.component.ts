import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Route } from '@angular/router/src/config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor (
    private _router: Router,
    private _flashMsg: FlashMessagesService,
    private _authServ: AuthService
  ) {}

  ngOnInit() {
  }

  onSubmit () {
    this._authServ.login(this.email, this.password).then((res) => {
      this._flashMsg.show(
        'Log in successfull',
        {cssClass: 'alert-success', timeout: 6000}
      );
      this._router.navigate(['/']);
    }).catch((err) => {
      this._flashMsg.show(
        err.message,
        {cssClass: 'alert-danger', timeout: 6000}
      );
      this._router.navigate(['/login']);
    })
  }
}