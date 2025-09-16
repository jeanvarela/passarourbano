import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertaService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertaService]
})
export class OfertaComponent implements OnInit {

  public oferta: Oferta;

  constructor(private route: ActivatedRoute,
              private ofertaService: OfertaService) { }

  ngOnInit(): void {
    this.route.params.subscribe((parametros: Params) => {
      this.ofertaService.getOfertaPorId(parametros.id).then((oferta: Oferta) => {
        this.oferta = oferta;
        console.log(this.oferta)
      })
    });
  }
}
