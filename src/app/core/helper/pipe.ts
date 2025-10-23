import { Injectable } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Pipe {

  private loading:any;

  constructor(
    public navCtrl: NavController,
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    public router: Router,
  ) { }

  async root(route: string) {
    this.loadingEnd();
    console.log(this.loading);
    this.navCtrl.setDirection('root', true, 'forward');
    await this.router.navigateByUrl(route);
  }

  async next(route: string) {
    this.loadingEnd();
    console.log(this.loading);
    await this.navCtrl.navigateForward(route);
  }

  async navigate(route: string, navigationExtras: any) {
    // this.loadingEnd();
    console.log(this.loading);
    await this.navCtrl.navigateForward(route, navigationExtras);
  }

  async back(route: string) {
    this.loadingEnd();
    console.log(this.loading);
    await this.navCtrl.navigateBack(route);
  }

  async loadingStart() {
    this.loading = await this.loadingCtrl.create({
      spinner: null,
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
      mode: 'ios',
      cssClass: 'custom-class custom-loading'
    });
    return await this.loading.present();
  }

  async loadingEnd() {
    if (this.loading !== undefined) {
      this.loading.dismiss();
    }
  }

  async alert(head, msg) {
    const alert = await this.alertController.create({
      header: head,
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  async dialogBox(onOkay) {
    const alert = await this.alertController.create({
      header: 'Pesan',
      message: 'Apakah anda yakin ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            return false;
          }
        }, {
          text: 'Okay',
          handler: () => {
            return onOkay;
          }
        }
      ]
    });

    await alert.present();
  }

  async alertConfirm() {
    const alert = await this.alertController.create({
      header: 'Pesan',
      message: 'Apakah anda yakin ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            return false;
          }
        }, {
          text: 'Okay',
          handler: () => {
            return true;
          }
        }
      ]
    });

    await alert.present();
  }

  prepend(value, array) {
    var newArray = array.slice();
    newArray.unshift(value);
    return newArray;
  }

  async alertClass(head, msg, aclass) {
    head != "" ? head = '<h3>' + head + '</h3>' : head = '';
    const alert = await this.alertController.create({
      message: head + msg,
      buttons: ['OK'],
      cssClass: aclass
    });
    await alert.present();
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(resolve, ms));
  }

}