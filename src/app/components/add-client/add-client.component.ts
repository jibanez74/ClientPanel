import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../../interfaces/Client';
import { ClientsService } from '../../services/clients.service';
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
    phone: '',
    email: '',
    balance: 0
  }
  enable_balance_on_add: boolean;
  @ViewChild('clientForm') form: any;

  constructor (
    private _settings: SettingsService,
    private _clientsServ: ClientsService,
    private _router: Router,
    private _flash: FlashMessagesService
  ) {}

  ngOnInit () {
    this.enable_balance_on_add = this._settings.get_settings().enable_balance_on_add;
  }

  onSubmit (
    {value, valid}:{value: Client, valid: boolean}
  ) {
    //if there is no balance, make it 0
    if (!this.enable_balance_on_add) {
      value.balance = 0;
    }

    //process form
    if (!valid) {
      this._flash.show(
        'Please fill in the form correctly!',
        {cssClass: 'alert-danger', timeout: 10000}
      );
    } else {
      this._clientsServ.add_new_client(value);
      this._flash.show(
        'New client has been added!',
        {cssClass: 'alert-success', timeout: 5000}
      );
      this._router.navigate(['/']);
    }
  }
}