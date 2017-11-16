import { Component, OnInit } from '@angular/core';
import { Client } from '../../interfaces/Client';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: any[];
  total_balance_owe: number;

  constructor (private fsServ: FirebaseService) {

  }

  ngOnInit () {
    this.fsServ.get_all_client().subscribe((data) => {
      this.clients = data;
      this.get_total_owed();
    });
  }

  get_total_owed () {
    let total = 0;
    for (let i = 0; i < this.clients.length; i ++) {
      total += parseFloat(this.clients[i].balance);
    }
    this.total_balance_owe = total;
  }
}