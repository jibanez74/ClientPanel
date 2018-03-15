import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user_email: string;
  user_password: string;

  constructor (
    private _router: Router,
    private _flash: FlashMessagesService,
    private _auth: AuthService
  ) {}

  ngOnInit () {
    this._auth.get_auth().subscribe((state) => {
      if (state) {
        this._router.navigate(['/']);
      }
    });
  }

  onSubmit () {
    this._auth.login(this.user_email, this.user_password).then((res) => {
      this._flash.show(
        'You have successfully logged in!',
        {cssClass: 'alert-success', timeout: 5000}
      );
      this._router.navigate(['/']);
    }).catch((res) => {
      this._flash.show(
        res,
        {cssClass: 'alert-danger', timeout: 10000}
      );
    });
  }
}
