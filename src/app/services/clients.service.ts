// This file is responsable for the clients services
// Any questions about specific firestore functions, please refere to the firebase documentation// 
import { Injectable } from '@angular/core';
import { Client } from '../interfaces/Client';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';

@Injectable()
export class ClientsService {
  clients_collection: AngularFirestoreCollection <Client>;
  client_document: AngularFirestoreDocument <Client>;
  clients: Observable <Client[]>;
  client: Observable <Client>;

  constructor (private _firestore: AngularFirestore) {
    this.clients_collection = this._firestore.collection('clients', ref => ref.orderBy('lastName', 'asc'));
  }

  //grab all the clients including there id
  get_clients(): Observable<Client[]> {
    // Get clients with the id
    this.clients = this.clients_collection.snapshotChanges().map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Client;
        data.id = action.payload.doc.id;
        return data;
      });
    });
    return this.clients;
  }

  //adding a new client to firestore
  add_new_client (client: Client) {
    this.clients_collection.add(client);
  }

  //grabbing a particular client from the firestore db
  get_client_details (id: string): Observable<Client> {
    this.client_document = this._firestore.doc<Client>(`clients/${id}`);
    this.client = this.client_document.snapshotChanges().map(action => {
      if(action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Client;
        data.id = action.payload.id;
        return data;
      }
    });
    return this.client;
  }

  //updates client's information
  edit_client (client: Client) {
    this.client_document = this._firestore.doc(`clients/${client.id}`);
    this.client_document.update(client);
  }

  remove_client (client: Client) {
    this.client_document = this._firestore.doc(`clients/${client.id}`);
    this.client_document.delete();
  }
}