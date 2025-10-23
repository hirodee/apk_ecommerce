import { Injectable } from '@angular/core';
import { Database } from '../helper/db';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  url_server: any = 'http://192.168.80.24/aipos_bplus_ori2';
  api_endpoint: any = '/api/v2/';

  users: any = {};
  constructor(
    private db: Database,
    private storage: Storage
  ) { }

  async getUsers() {
    await this.db.get('user', (res) => {
      return this.users = res;
    });
  }

  async setState(data) {
    this.db.get('user', (res) => {
      let setPromise = new Promise((resolve, reject) => {
        let pengaturan = res;
        pengaturan[data.key] = data.value;
        this.db.set('user', pengaturan);
        resolve(true)
      })

      //update state after we sure that data was updated successfully
      setPromise.then((_) => {
        this.getUsers();
      })
    });
  }

  setUrl() {
    return this.storage.set('url_server', this.url_server);
  }

  initUrl() {
    return new Promise((resolve, reject) => {
      this.storage.get('url_server').then((res) => {
        this.url_server = res;

        resolve(this.url_server);
      })
    })
  }
}
