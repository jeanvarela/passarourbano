import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertaService } from 'src/app/ofertas.service';

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css']
})
export class OndeFicaComponent implements OnInit {

   public ondeFica: string = ''

  constructor(private route: ActivatedRoute, 
              private ofertaService: OfertaService
  ) { }

  ngOnInit(): void {
    this.route.parent.paramMap.subscribe((parametros) => {
        this.ofertaService.getOndeFicaPorId(Number(parametros.get('id')))
                          .then((resposta: string) => {
                              this.ondeFica = resposta
                          })

    })
  }
}
