import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Pipe } from 'src/app/core/helper/pipe';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginProses = false;
  bs;

  constructor(
    public platform: Platform,
    private pipe: Pipe,
    public auth: AuthService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.bs = this.platform.backButton.subscribe(() => {
      this.pipe.root('/tabs');
      this.bs.unsubscribe();
    });
  }

  ionViewWillLeave() {
    // this.bs.unsubscribe();
  }

  toDaftar() {
    this.pipe.next('/daftar');
  }

  toForgot() {
    
  }

}
