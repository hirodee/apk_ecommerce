import { Injectable } from '@angular/core';
import { Connect } from '../helper/connect';
import { Observable, forkJoin, combineLatest } from 'rxjs';
import { Pipe } from '../helper/pipe';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private con: Connect,
    private pipe: Pipe,
    private state: StateService
  ) { }

  getSales(params: any) {
    this.con.tokenPOST;
    this.con.userID();
    this.con.add('query', params.query);
    return this.con.observable('order/get-sales');
  }

  getData(): Observable<any> {
    // let response1 = this.getPilMedia();
    // let response2 = this.getBank();
    // let orderHariIni = this.getOrderHariIni();
    // let response4 = this.getExpedisi();
    let product = this.getProduct({ query: "", kategori: "" });
    return combineLatest([product]);
  }

  printNota(id): Observable<any> {
    this.con.userID();
    this.con.add('id', id);
    this.con.add('format', this.state.users.print_format)
    return this.con.observable('order/print-nota');
  }

  deleteById(id: any) {
    this.con.userID();
    this.con.add('id', id);
    return this.con.observable('order/delete-order');
  }

  getProduct(params: any) {
    this.con.tokenPOST;
    this.con.userID();
    this.con.add('query', params.query);
    this.con.add('kategori', params.kategori);
    return this.con.observable('order/get-product');
  }

  getProductByBarcode(params): Observable<any> {
    this.con.tokenPOST;
    this.con.userID();
    this.con.add('barcode', params.barcode);
    return this.con.observable('order/get-product-by-barcode');
  }

  getMember(params: any) {
    this.con.tokenPOST;
    this.con.userID();
    this.con.add('query', params.query);
    return this.con.observable('order/get-member');
  }

  getExpedisi() {
    this.con.tokenPOST;
    return this.con.observable('order/get-expedisi');
  }

  getOrderById(id) {
    this.con.userID();
    this.con.add('id', id);
    return this.con.observable('order/get-order-by-id');
  }

  getPilMedia() {
    this.con.tokenPOST;
    return this.con.observable('order/get-pil-media');
  }

  getBank() {
    this.con.tokenPOST;
    return this.con.observable('order/get-pil-bank');
  }

  getOrderHariIni() {
    this.con.tokenPOST;
    this.con.userID();
    return this.con.observable('order/get-order-hari-ini');
  }

  getHistoryOrder(params): Observable<any> {
    this.con.tokenPOST;
    this.con.userID();
    for (let item in params) {
      this.con.add(item, params[item]);
    }
    return this.con.observable('order/get-history-order');
  }

  getDetailOrder(params): Observable<any> {
    this.con.tokenPOST;
    this.con.userID();
    for (let item in params) {
      this.con.add(item, params[item]);
    }
    return this.con.observable('order/get-detail-order');
  }

  save(postData): Observable<any> {
    this.con.userID();
    for (let key in postData) {
      this.con.add(key, postData[key]);
    }
    return this.con.observable('order/save_order');
  }

}
