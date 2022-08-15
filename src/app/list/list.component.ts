import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Movimento } from '../model/movimento';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  movimentosList: Array<Movimento> = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.consultaMovimentos();
  }

  consultaMovimentos() {
    this.http.get('http://localhost:8080/api/movimentos').subscribe((data: any) => {
      this.movimentosList = data;
    });
  }

  parseLancamento(lancamento: any) {
    if (isNaN(lancamento)) {
      return '';
    }

    return String(lancamento).padStart(3, '0');
  }

}
