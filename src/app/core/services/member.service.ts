import { Injectable } from '@angular/core';
import { Connect } from '../helper/connect';
import { Observable } from 'rxjs';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class MemberService {


  constructor(
    private con: Connect,
    private state: StateService
  ) { }

  getData(params: any): Observable<any> {
    this.con.userID();
    this.con.add('query', params.query)
    this.con.add('id_toko', this.state.users.id_toko)
    return this.con.observable('member/get_all');
  }
  getKode(): Observable<any> {
    this.con.userID();
    this.con.add('id_toko', this.state.users.id_toko)
    return this.con.observable('member/generate_kode');
  }

  save(params: any): Observable<any> {
    this.con.userID();
    for (let key in params) {
      this.con.add(key, params[key]);
    }
    return this.con.observable('member/save');
  }

  delete(params: any): Observable<any> {
    this.con.userID();
    this.con.add('id_member', params.id_member);
    return this.con.observable('member/delete');
  }
}
