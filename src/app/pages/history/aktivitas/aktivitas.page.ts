import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivityService } from 'src/app/core/services/activity.service';
import { Pipe } from 'src/app/core/helper/pipe';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-aktivitas',
  templateUrl: './aktivitas.page.html',
  styleUrls: ['./aktivitas.page.scss'],
})
export class AktivitasPage implements OnInit {

  subscribedData: any;
  dataAktivitas: any = [];
  constructor(
    private activityService: ActivityService,
    private pipe: Pipe
  ) { }

  ngOnInit() {



  }

  ionViewWillEnter() {
    this.pipe.loadingStart();
    this.subscribedData = this.activityService.getRiwayat().subscribe((res) => {
      this.dataAktivitas = res.data;
      this.pipe.loadingEnd();
    }, (err) => {
      this.pipe.loadingEnd();
    })
  }

  openDetail(item) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        data: item
      }
    }
    this.pipe.navigate('aktivitas-detail', navigationExtras);
  }

  isTodayOrYst(tanggal): boolean {
    let fullDate = new Date(),
      currDate = `${("0" + fullDate.getDate()).slice(-2)}-${("0" + (fullDate.getMonth() + 1)).slice(-2)}-${fullDate.getFullYear()}`,
      yst = new Date();
    yst.setDate(yst.getDate() - 1);
    let ystr = `${("0" + yst.getDate()).slice(-2)}-${("0" + (yst.getMonth() + 1)).slice(-2)}-${yst.getFullYear()}`;

    if (tanggal == currDate || tanggal == ystr) {
      console.log('is', 'true');
      return true;
    } else {
      console.log('date', `curr: ${currDate}, yst: ${ystr}, tanggal: ${tanggal}`)
      console.log('is', 'false');
      return false;
    }
  }

  editActivity(id) {
    let ne: NavigationExtras = {
      queryParams: {
        id: id
      }
    }

    this.pipe.navigate('laporan/aktivitas', ne);
  }

  @ViewChild('slidingItem', { static: false }) slidingItem: any;

  isOpened: boolean = false;
  openSlide(slidingItem) {
    if (this.isOpened) {
      slidingItem.closeOpened();
      this.isOpened = false;
    } else {
      slidingItem.open();
      this.isOpened = true;
    }
  }

  ionViewDidLeave() {
    this.subscribedData.unsubscribe();
  }
}
