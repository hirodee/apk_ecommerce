import { Injectable } from '@angular/core';
import { Connect } from '../helper/connect';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(
    private con: Connect
  ) { }

  setPrinterFormat(format) {
    this.con.userID();
    this.con.add('format', format);
    return this.con.observable('pengaturan/format_nota');
  }

  setReturUpdateStok(params: any) {
    this.con.userID();
    for (let key in params) {
      this.con.add(key, params[key]);
    }
    return this.con.observable('pengaturan/retur_update_stok');
  }
}
