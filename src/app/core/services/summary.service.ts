import { Injectable } from '@angular/core';
import { Connect } from '../helper/connect';
import { Observable, combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {


  constructor(
    private con: Connect
  ) { }

  getSummary(): Observable<any> {
    this.con.userID();
    return this.con.observable('/summary/get_summary');
  }

  getProdukTerlaris(params: any): Observable<any> {
    this.con.userID();
    this.con.add("state", params.state);
    return this.con.observable('/summary/get_produk_terlaris')
  }

  getPenjualanTerakhir(): Observable<any> {
    this.con.userID();
    return this.con.observable('/summary/get_penjualan_terakhir')
  }

  getDataChart(params: any): Observable<any> {
    this.con.userID();
    this.con.add("state", params.state);
    return this.con.observable('/summary/get_grafik_penjualan')
  }

  getLaporanPenjualan(params: any): Observable<any> {
    let dataChart = this.getDataChart({ state: params.chart_penjualan });
    let produkTerlaris = this.getProdukTerlaris({ state: params.terlaris });
    let penjualanTerakhir = this.getPenjualanTerakhir();

    return combineLatest([produkTerlaris, penjualanTerakhir, dataChart]);
  }
}
