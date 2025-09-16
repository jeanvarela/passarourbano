import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertaService } from 'src/app/ofertas.service';

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css']
})
export class ComoUsarComponent implements OnInit {

  public comoUsar: string = ''

  constructor(private route: ActivatedRoute,
              private ofertaService: OfertaService
  ) { }

  ngOnInit(): void {
    this.route.parent.paramMap.subscribe((parametros) => {
        this.ofertaService.getComoUsarOfertaPorId(Number(parametros.get('id')))
                          .then((resposta: string) => {
                              this.comoUsar = resposta
                          })

    })
  }
}
