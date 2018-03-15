import { Component, OnInit } from '@angular/core';
import { Client } from '../../interfaces/Client';
import { ClientsService } from '../../services/clients.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  has_balance: boolean;
  disable_balance_update_input: boolean;
  enable_balance_on_edit: boolean;

  constructor (
    private _flash: FlashMessagesService,
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _settings: SettingsService,
    private _clientsServ: ClientsService
  ) {

  }

  ngOnInit () {
    this.enable_balance_on_edit = this._settings.get_settings().enable_balance_on_edit;
    //grab the client's id from the url
    this.id = this._activeRoute.snapshot.params['id'];
    this._clientsServ.get_client_details(this.id).subscribe((data) => {
      if (data != null) {
        if (data.balance > 0) {
          this.has_balance = true;
        } else {
          this.has_balance = false;
        }
      }
      this.client = data;
    });
  }

  delete_client () {
    if (confirm('Are you sure you want to completely remove this client from the system?')) {
      this._clientsServ.remove_client(this.client);
      this._flash.show(
        'Client has been removed!',
        {cssClass: 'alert-success', timeout: 5000}
      );
      this._router.navigate(['/']);
    }
  }

  change_balance () {
    this._clientsServ.edit_client(this.client);
    this._flash.show(
      'Balance has been updated!',
      {cssClass: 'alert-success', timeout: 5000}
    );
  }
}