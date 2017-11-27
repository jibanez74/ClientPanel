import { Component, OnInit } from '@angular/core';
import { Client } from '../../interfaces/Client';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from '../../services/settings.service';
import { FlashMessagesModule } from 'angular2-flash-messages/module/module';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }

  disable_balance_on_edit: boolean = false;

  constructor (
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _flashMsg: FlashMessagesService,
    private _fsServ: FirebaseService,
    private _settings: SettingsService
  ) {}

  ngOnInit () {
    //grab incomming info from client
    this.id = this._activeRoute.snapshot.params['id'];
    //get the client
    this._fsServ.get_client(this.id).subscribe((data) => {
      this.client = data;
    })
    this.disable_balance_on_edit = this._settings.set_settings().disable_balance_on_edit;
  }

  onSubmit (
    {value, valid}: {value: Client, valid: boolean}
  ) {
    if (!valid) {
      this._flashMsg.show(
        'Please make sure to fill in the form correctly',
        {cssClass: 'alert-danger', timeout: 6000}
      );
      this._router.navigate(['/edit-client' + this.id])
    } else {
      //if successfull update the client
      this._fsServ.modify_client(this.id, value);
      this._flashMsg.show(
        'Client updated successfully',
        {cssClass: 'alert-success', timeout: 6000}
      );
      this._router.navigate(['/client/' + this.id]);
    }
  }
}