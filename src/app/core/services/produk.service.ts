import { Injectable } from '@angular/core';
import { Connect } from '../helper/connect';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdukService {


  constructor(
    private con: Connect
  ) { }

  getProduct(params: any) {
    this.con.tokenPOST;
    this.con.userID();
    this.con.add('query', params.query);
    this.con.add('kategori', params.kategori);
    return this.con.observable('order/get-product');
  }

  generateBarcode(): Observable<any> {
    this.con.userID();
    return this.con.observable('produk/generate-barcode');
  }

  save(params: any): Observable<any> {
    this.con.userID();
    for (let key in params) {
      if (key != "gambar") {
        this.con.add(key, params[key]);
      } else {
        if (params[key].blob) {
          this.con.addImage("gambar", params[key].blob, params[key].name);
        }
      }
    }
    return this.con.observable('produk/save');
  }
}
