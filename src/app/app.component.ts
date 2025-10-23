import { Component, ViewChild } from '@angular/core';

import { Platform, IonRouterOutlet, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StateService } from './core/services/state.service';
import { Router, NavigationExtras } from '@angular/router';
import { Pipe } from './core/helper/pipe';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private state: StateService,
    private router: Router,
    private alertCtrl: AlertController,
    private pipe: Pipe,
    private storage: Storage
  ) {
    this.initializeApp();
  }

  @ViewChild(IonRouterOutlet, { static: false }) routerOutlet:
    | IonRouterOutlet
    | undefined;
  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      //initiate url server
      this.storage.get('url_server').then((res) => {
        if (res) {
          this.state.initUrl().then((res) => {
            this.state.getUsers().then((res) => {
              console.log('users loaded', res);
            });
          });
        } else {
          let navExtras: NavigationExtras = {
            queryParams: {
              postInstallation: true,
            },
          };
          this.pipe.navigate('/server-setting', navExtras);
        }
      });
    });
    this.platform.backButton.subscribe(() => {
      if (this.routerOutlet && this.routerOutlet.canGoBack()) {
        this.pipe.next('/home');
      } else if (this.router.url === '/home') {
        this.presentAlertConfirm();
      } else {
        this.presentAlertConfirm();
      }
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      message: 'Do you want to exit the app?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            navigator['app'].exitApp();
          },
        },
      ],
    });

    await alert.present();
  }
}
