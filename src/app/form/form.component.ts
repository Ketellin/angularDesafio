import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Cosif } from '../model/cosif';

import { Movimento } from '../model/movimento';
import { Produto } from '../model/produto';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  formDisabled = true;

  movimento = new Movimento();

  produtosList: Array<Produto> = [];
  cosifsList: Array<Cosif> = [];
  movimentosList: Array<Movimento> = [];


  constructor(private http: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  ngOnInit(): void {
    this.onBtnLimparClick();
    this.consultarProdutos();
    this.consultaMovimentos();
  }

  onProdutoChange(select: any) {
    const codProduto = select.value;
    this.movimento.codProduto = codProduto;
    this.consultaCosif(codProduto)
  }

  onCosifChange(select: any) {
    const codCosif = select.value;
    this.movimento.codCosif = codCosif;
  }

  onBtnLimparClick() {
    this.limparFormulario();
  }

  onBtnNovoClick() {
    this.formDisabled = false;
  }

  onBtnIncluirClick() {

    this.http.post('http://localhost:8080/api/movimentos', this.movimento).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.error("erro: ", error);
      }
    );
    this.limparFormulario();
    this.formDisabled = true;
    
 
    window.location.reload();
  }

  private consultarProdutos() {
    this.http.get('http://localhost:8080/api/produtos').subscribe((data: any) => {
      this.produtosList = data;
      console.log(this.produtosList)
      
    });
  }

  private consultaCosif(codProduto: number) {
    this.http.get(`http://localhost:8080/api/cosifs/${codProduto}`).subscribe((data: any) => {
      this.cosifsList = data;
      console.log(data);
    });
  }

  consultaMovimentos() {
    this.http.get('http://localhost:8080/api/movimentos').subscribe((data: any) => {
      this.movimentosList = data;
      console.log(data);
    });
  }

  private limparFormulario() {
    this.movimento = new Movimento();
  }


}
