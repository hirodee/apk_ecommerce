import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Connect } from '../helper/connect';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(
    private con: Connect
  ) { }

  getDateAvailableActivity() {
    return this.con.observable('activity/get_available_date');
  }

  getById(id: any) {
    this.con.userID();
    this.con.add('id', id);
    return this.con.observable('activity/get_by_id');
  }

  save(postData): Observable<any> {
    this.con.userID();
    for (let key in postData) {
      this.con.add(key, postData[key]);
    }
    return this.con.observable('activity/save_activity');
  }

  getRiwayat(): Observable<any> {
    this.con.userID();
    return this.con.observable('activity/get_riwayat');
  }

  getDetailRiwayat(id_laporan): Observable<any> {
    this.con.userID();
    this.con.add('id_laporan', id_laporan);
    return this.con.observable('activity/get_detail_riwayat');
  }

  getPeringkat(isLimit): Observable<any> {
    this.con.userID();
    if (isLimit) {
      this.con.add('limit', '4');
    }
    return this.con.observable('activity/get_peringkat');
  }
}
