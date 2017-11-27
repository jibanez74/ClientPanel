import { Component, OnInit } from '@angular/core';
import { Client } from '../../interfaces/Client';
import { FirebaseService } from '../../services/firebase.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {
  Router,
  ActivatedRoute,
  Params
} from '@angular/router';
import { SettingsService } from '../../services/settings.service';
import { Settings } from '../../interfaces/Settings';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  has_balance: boolean;
  show_balance_input: boolean;
  client: Client;
  disable_balance_input: boolean = false;

  constructor (
    private fsServ: FirebaseService,
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _flashMsg: FlashMessagesService,
    private _settingsServ: SettingsService
  ) {}

  ngOnInit () {
    //get id from the incomming URL
    this.id = this._activeRoute.snapshot.params['id'];
    //then get the specific client comming in
    this.fsServ.get_client(this.id).subscribe((data) => {
      if (data.balance > 0) {
        this.has_balance = true;
      }
      this.client = data;
    });
    this.disable_balance_input = this._settingsServ.set_settings().disable_balance_on_edit;
  }

  click_to_delete () {
    if (confirm("Are you sure you want to delete this client from the data base?")) {
      this.fsServ.remove_client(this.id);
      this._flashMsg.show(
        "The client was removed from the data base",
        {cssClass: 'alert-success', timeout: 6000}
      );
      this._router.navigate(['/'])
    }
  }

  update_balance (id: string) {
    this.fsServ.modify_client(this.id, this.client);
    this._flashMsg.show(
      "Balance has been updated!",
      {cssClass: 'alert-success', timeout: 6000}
    );
    this._router.navigate(['/client/' + this.id])
  }
}