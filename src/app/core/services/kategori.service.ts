import { Injectable } from '@angular/core';
import { Connect } from '../helper/connect';
import { StateService } from './state.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KategoriService {

  constructor(
    private con: Connect,
    private state: StateService
  ) { }

  getData(params: any): Observable<any> {
    this.con.userID();
    this.con.add('query', params.query)
    this.con.add('id_toko', this.state.users.id_toko)
    return this.con.observable('kategori/get_all');
  }

  saveData(params) {
    this.con.userID();
    for (let key in params) {
      this.con.add(key, params[key]);
    }
    return this.con.observable('kategori/save');
  }

  deleteKategori(params: any) {
    this.con.userID();
    this.con.add("id_kategori_2", params.id_kategori_2)
    return this.con.observable('kategori/delete');
  }
}
