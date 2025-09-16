import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from './ordem-compra.service'
import { Pedido } from './../shared/pedido.model'

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  public idPedidoCompra: number;

  public endereco: string = '';
  public numero: string
  public complemento: string = '';
  public formaPagamento: string = ''

  public enderecoValido: boolean;
  public numeroValido: boolean;
  public complementoValido: boolean;
  public formaPagamentoValida: boolean;

  public enderecoEstadoPrimitivo: boolean = true;
  public numeroEstadoPrimitivo: boolean = true;
  public complementoEstadoPrimitivo: boolean = true;
  public formaPagamentoEstadoPrimitivo: boolean = true;
  public botaDesabilitado: boolean = true
  
  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit(): void {
    // this.ordemCompraService.efetivarCompra()
  }

  public atualizaEndereco(endereco: string){
    this.endereco = endereco;
    this.enderecoEstadoPrimitivo = false;

    this.enderecoValido = this.endereco.length > 3
    this.habilitaForm();
  }

  public atualizaNumero(numero: string){
    this.numero = numero;
    this.numeroEstadoPrimitivo = false;

    this.numeroValido = this.numero.length > 0;
    this.habilitaForm();
  }

  public atualizaComplemento(complemento: string){
    this.complemento = complemento;
    this.complementoEstadoPrimitivo = false;

    if (this.complemento.length > 0){
      this.complementoValido = true
    }
    this.habilitaForm();
  }

  public atualizaFormaPagamento(formaPagamento: string){
    this.formaPagamento = formaPagamento
    this.formaPagamentoEstadoPrimitivo = false;
    
    this.formaPagamentoValida = formaPagamento.length > 0;  
    this.habilitaForm();
  }

  public habilitaForm(): void {
    if (this.enderecoValido && this.numeroValido && this.formaPagamentoValida){
      this.botaDesabilitado =  false
    }else {
      this.botaDesabilitado =  true
    }
  }

  public confirmarCompra(): void {
    let pedido: Pedido = new Pedido(this.endereco,this.numero, this.complemento, this.formaPagamento);
    this.ordemCompraService.efetivarCompra(pedido)
                           .subscribe((parametros) => {
                                this.idPedidoCompra = parametros.id
                           });
  }
}
