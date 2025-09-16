import { Injectable } from "@angular/core";
import { Pedido } from './../shared/pedido.model'

import { HttpClient,  HttpHeaders} from '@angular/common/http';

import { URL_API } from "./../api.app";
import { Observable } from "rxjs";


@Injectable()
export class OrdemCompraService {


    constructor(private http: HttpClient){
    }

    public efetivarCompra(pedido: Pedido): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this.http.post<any>(`${URL_API}/pedidos`,
                              JSON.stringify(pedido),
                              { headers })

    }
}