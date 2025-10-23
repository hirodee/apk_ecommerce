import { Injectable } from '@angular/core';
import { Pipe } from '../helper/pipe';
import { Connect } from '../helper/connect';
import { Database } from '../helper/db';
import { Validators, FormBuilder } from '@angular/forms';
import { StateService } from './state.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  fLogin: any;

  constructor(
    private pipe: Pipe,
    private con: Connect,
    private db: Database,
    private formBuilder: FormBuilder,
    private state: StateService
  ) {
    this.fLogin = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async onLogin() {
    await this.pipe.loadingStart();
    this.con.tokenPOST;
    this.con.add("email", this.fLogin.value.email);
    this.con.add("password", this.fLogin.value.password);
    this.con.run('auth/login', (res:any) => {
      this.pipe.loadingEnd();
      if (res.status == "ok") {
        this.state.users = res.data;
        this.db.set('user', res.data);
        this.pipe.root('/home');
      } else {
        this.pipe.alert("Login", res.msg);
      }
    }, (err: any) => {
      console.log(err);
      this.pipe.loadingEnd();
      this.pipe.alert("Error", typeof (err.msg) !== "undefined" ? err.msg : "error");
    });
  }

  changePassword(postData:any): Observable<any> {
    this.con.userID();
    for (let key in postData) {
      this.con.add(key, postData[key]);
    }
    return this.con.observable('users/change_password');
  }

  logout() {
    this.db.remove('user');
    this.pipe.root('login');
  }
}
