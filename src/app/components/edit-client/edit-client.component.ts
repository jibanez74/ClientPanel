import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../../interfaces/Client';
import { ClientsService } from '../../services/clients.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    balance: 0
  }
  enable_balance_on_edit: boolean;
  id: string;

  constructor (
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _clientServ: ClientsService,
    private _settings: SettingsService,
    private _flash: FlashMessagesService
  ) {}

  ngOnInit () {
    this.enable_balance_on_edit = this._settings.get_settings().enable_balance_on_edit;
    //grab the client's id from the url
    this.id = this._activeRoute.snapshot.params['id'];
    this._clientServ.get_client_details(this.id).subscribe(data => this.client = data);
  }

  onSubmit (
    {value, valid} : {value: Client, valid: boolean}
  ) {
    if (!valid) {
      this._flash.show(
        'Please fill out the form correctly!',
        {cssClass: 'alert-danger', timeout: 10000}
      );
    } else {
     value.id = this.id;
      this._clientServ.edit_client(value);
      this._flash.show(
        'Details updated successfully!',
        {cssClass: 'alert-success', timeout: 5000}
      );
      this._router.navigate([`/client/${this.id}`]);
    }
  }
}