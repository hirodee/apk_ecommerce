import { Injectable } from '@angular/core';
import { Connect } from '../helper/connect';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SatuanService {


  constructor(
    private con: Connect
  ) { }

  getSatuan(params: any): Observable<any> {
    this.con.userID();
    this.con.add('query', params.query);
    return this.con.observable('satuan/get_all');
  }

  saveData(params) {
    this.con.userID();
    for (let key in params) {
      this.con.add(key, params[key]);
    }
    return this.con.observable('satuan/save');
  }

  deleteSatuan(params: any) {
    this.con.userID();
    this.con.add("id_satuan", params.id_kategori_2)
    return this.con.observable('satuan/delete');
  }
}
