import { Injectable } from '@angular/core';
import { Client } from '../interfaces/Client';
import { Observable } from 'rxjs/Observable';
import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList
} from 'angularfire2/database';

@Injectable()
export class FirebaseService {
  clients_ref: AngularFireList<any>;
  clients: Observable<any[]>;
  client: Observable<any>;

  constructor (
    private db: AngularFireDatabase
  ) {
    this.clients_ref = this.db.list('clients');
    this.clients = this.clients_ref.snapshotChanges().map((changes) => {
      return changes.map((c) => (
        {
          key: c.payload.key, ...c.payload.val()
        }
      ));
    });
  }

  //this function gets all clients to be displayed in the dashboard
  get_all_client () {
    return this.clients;
  }

  //this function will add a new client to firebase through the add-client component
  add_new_client (client: Client) {
    this.clients_ref.push(client);
  }

  //function to get a particular client's info from firebase
  get_client (id: string) {
    this.client = this.db.object('/clients/' + id).valueChanges();
    return this.client;
  }

  //function to edit a client's information through the edit-client component
  modify_client (id: string, client: Client) {
    return this.clients_ref.update(id, client);
  }
}