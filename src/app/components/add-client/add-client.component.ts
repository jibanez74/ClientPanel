import { Component, OnInit } from '@angular/core';
import { Client } from '../../interfaces/Client';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }
  disable_balance_on_add: boolean = false;

  constructor (
    private fsServ: FirebaseService,
    private _router: Router,
    private _flashMsg: FlashMessagesService,
    private _settingsServ: SettingsService
  ) {}

  ngOnInit () {
    this.disable_balance_on_add = this._settingsServ.set_settings().disable_balance_on_add;
  }

  onSubmit (
    {value, valid} : {value: Client, valid: boolean}
  ) {
    if (this.disable_balance_on_add) {
      value.balance = 0;
    }
    //if else to add add a client or reject form submition
    if (!valid) {
      this._flashMsg.show(
        'Please fill in all required fields',
        {cssClass: 'alert-danger', timeout: 6000}
      );
      this._router.navigate(['/add-client']);
    } else {
      //add client to the db
      this.fsServ.add_new_client(value);
      this._flashMsg.show(
        'New client added successfully to Firebase',
        {cssClass: 'alert-success', timeout: 6000}
      );
      this._router.navigate(['/']);
    }
  }
}