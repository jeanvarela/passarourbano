import { Component, OnInit } from '@angular/core';
import { OfertaService } from '../ofertas.service';
import { Observable, Subject, of } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css']
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>
  public subjectPesquisa: Subject<string> = new Subject<string>();

  constructor(private ofertaService: OfertaService) { }

  ngOnInit(): void {
     this.ofertas = this.subjectPesquisa.pipe(
       debounceTime(1000),
       distinctUntilChanged(),
       switchMap((termo: string) => {

          if (termo.trim() === '')
            return of([]);

          return this.ofertaService.pesquisaOfertas(termo);
       })
     );
  }

  public pesquisa(termoDaBusca: string): void {
    this.subjectPesquisa.next(termoDaBusca)
  }

  public limpapesquisa(): void {
    console.log('Limpando a pesquisa')
    this.subjectPesquisa.next('');
  }
}
