import { Injectable } from "@angular/core";
import { Oferta } from "./shared/oferta.model";

import { HttpClient } from '@angular/common/http';

import { URL_API } from "./api.app";
import { Observable } from "rxjs";
import { retry, catchError } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
  })
export class OfertaService {


    constructor(private http: HttpClient){
    }

    public getOfertas(): Promise<Oferta[]> {
        return this.http.get<Oferta[]>(`${URL_API}/ofertas?destaque=true`)
                        .toPromise()
                        .then((response: any) => response);
    }

    public getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
      return this.http.get<Oferta[]>(`${URL_API}/ofertas?categoria=${categoria}`)
                      .toPromise()
                      .then((response: any) => response);
    }

    public getOfertaPorId(id: number): Promise<Oferta> {
      return this.http.get<Oferta[]>(`${URL_API}/ofertas?id=${id}`)
                      .toPromise()
                      .then((response: any) => response.shift());
    }

    public getComoUsarOfertaPorId(id: number): Promise<String> {
      return this.http.get<Oferta[]>(`${URL_API}/como-usar?id=${id}`)
                      .toPromise()
                      .then((response: any) => {
                               return response.shift().descricao
                       });
    }

    public getOndeFicaPorId(id: number): Promise<String> {
      return this.http.get<Oferta[]>(`${URL_API}/onde-fica?id=${id}`)
                      .toPromise()
                      .then((response: any) => {
                               return response.shift().descricao
                       });
    }

    public pesquisaOfertas(termo: string): Observable<Oferta[]> {
      return this.http.get<Oferta[]>(`${URL_API}/ofertas?descricao_oferta_like=${termo}`) 
                      .pipe(
                        retry(10)
                      );    
    }

}