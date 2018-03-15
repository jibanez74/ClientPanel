import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user_email: string;
  user_password: string;

  constructor (
    private _router: Router,
    private _flash: FlashMessagesService,
    private _auth: AuthService
  ) {}

  ngOnInit() {
  }

  onSubmit () {
    this._auth.register(this.user_email, this.user_password).then((res) => {
      this._flash.show(
        'Successfully registered',
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