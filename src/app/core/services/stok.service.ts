import { Injectable } from '@angular/core';
import { Connect } from '../helper/connect';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StokService {


  constructor(
    private con: Connect
  ) { }

  getStockProduct(params: any) {
    this.con.tokenPOST;
    this.con.userID();
    this.con.add('query', params.query);
    this.con.add('kategori', params.kategori);
    this.con.add('page', params.page);

    /**
     * Set endpoint
     */
    let endpoint = "laporan/stok-produk";
    if (params.state == "mati") {
      endpoint = "laporan/stok-mati";
    }

    return this.con.observable(endpoint);
  }

  save(params: any): Observable<any> {
    this.con.userID();
    for (let key in params) {
      this.con.add(key, params[key]);
    }
    return this.con.observable('/produk/update_stok');
  }
}
