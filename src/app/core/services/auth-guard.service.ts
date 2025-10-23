import { Injectable } from '@angular/core';
import { StateService } from './state.service';
import { Pipe } from '../helper/pipe';
import { NavController } from '@ionic/angular';
import { Database } from '../helper/db';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private state: StateService,
    private pipe:Pipe,
    private db: Database
  ) { }

  canLoad(): Promise<boolean> {
    return this.db.get('user', (res) => {
      if (res) {
        console.log('true');
        return true;
      } else {
        this.pipe.root('login');
        return false;
      }
    })
  }
}
