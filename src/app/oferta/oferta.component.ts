import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertaService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { CarrinhoService } from './../carrinho.service'


@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertaService]
})
export class OfertaComponent implements OnInit {

  public oferta: Oferta;

  constructor(private route: ActivatedRoute,
              private ofertaService: OfertaService, 
              private carrinhoService: CarrinhoService) { }

  ngOnInit(): void {
    this.route.params.subscribe((parametros: Params) => {
      this.ofertaService.getOfertaPorId(parametros.id).then((oferta: Oferta) => {
        this.oferta = oferta;
      })
    });
  }

  public adicionarItemCarrinho(): void {
    this.carrinhoService.incluirItem(this.oferta)
  }
}
