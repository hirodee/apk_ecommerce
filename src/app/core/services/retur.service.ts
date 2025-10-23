import { Injectable } from '@angular/core';
import { Connect } from '../helper/connect';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReturService {

  constructor(
    private con: Connect
  ) { }

  createReturFaktur(params: any): Observable<any> {
    this.con.userID();
    for (let key in params) {
      this.con.add(key, params[key]);
    }
    return this.con.observable('retur/create_action_faktur');
  }

  getReturList(params: any): Observable<any> {
    this.con.userID();
    for (let key in params) {
      this.con.add(key, params[key]);
    }
    return this.con.observable('retur/get_data_retur');
  }

  getDetailRetur(id_faktur: any) {
    this.con.userID();
    this.con.add('id_retur', id_faktur);
    return this.con.observable('retur/get_detail_retur');
  }

  createReturManual(params: any): Observable<any> {
    this.con.userID();
    for (let key in params) {
      this.con.add(key, params[key]);
    }
    return this.con.observable('retur/create_action');
  }

}
