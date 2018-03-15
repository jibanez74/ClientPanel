import { Component, OnInit } from '@angular/core';
import { Client } from '../../interfaces/Client';
import { ClientsService } from '../../services/clients.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.css']
})
export class ClientsTableComponent implements OnInit {
  clients: Client[];
  total_owed: number;

  constructor (
    private _clientsServ: ClientsService
  ) {}

  ngOnInit () {
    this._clientsServ.get_clients().subscribe((data) => {
      this.clients = data;
      this.get_total_owed();
    });
  }

  //this function calculates the total owed and displays it on the html using the property total_owed
  get_total_owed () {
    this.total_owed = this.clients.reduce((total, client) => {
      return total + client.balance;
    }, 0);
  }
}