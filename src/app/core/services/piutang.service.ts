import { Injectable } from '@angular/core';
import { Connect } from '../helper/connect';
import { StateService } from './state.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PiutangService {


  constructor(
    private con: Connect,
    private state: StateService
  ) { }

  getData(params: any): Observable<any> {
    this.con.userID();
    this.con.add('query', params.query)
    this.con.add('id_toko', this.state.users.id_toko)
    return this.con.observable('piutang/get_all');
  }

  save(params) {
    this.con.userID();
    for (let key in params) {
      this.con.add(key, params[key]);
    }
    return this.con.observable('piutang/save');
  }
}
