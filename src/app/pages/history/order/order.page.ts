import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';
import { Pipe } from 'src/app/core/helper/pipe';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  listOrder: any;
  subscribedData: any;
  itSearch: boolean = false;
  valueSearch: string = "";
  currDate = new Date().toJSON().slice(0, 10);
  queryParams: any = {
    dari: this.currDate,
    sampai: this.currDate,
    query: ''
  }

  constructor(
    private orderService: OrderService,
    private pipe: Pipe,
    private clip: Clipboard,
    private ar: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.subData();
  }

  ionViewDidLeave() {
    this.unsubData();
  }

  dataHariIni() {
    this.pipe.loadingStart();
    this.subscribedData = this.orderService.getOrderHariIni().subscribe((res: any) => {
      this.listOrder = res.data;
      this.pipe.loadingEnd();
    }, (err) => {
      this.pipe.alert('Gagal', `Ambil data gagal silahkan cek koneksi internet anda. reason: ${err.error}`);
    });
  }

  subData() {
    this.pipe.loadingStart();
    this.subscribedData = this.orderService.getHistoryOrder(this.queryParams).subscribe((res) => {
      this.listOrder = res.data;
      this.pipe.loadingEnd();
    }, (err) => {
      this.pipe.alert('Gagal', `Ambil data gagal silahkan cek koneksi internet anda. reason: ${err.error}`);
    });
  }

  openDetail(id) {
    let navExtras: NavigationExtras = {
      queryParams: {
        id: id
      }
    }
    this.pipe.navigate('order-detail', navExtras)
  }

  unsubData() {
    this.subscribedData.unsubscribe();
  }

  toggleSearch() {
    if (!this.itSearch) {
      this.itSearch = true;
    } else {
      this.itSearch = false;
      this.valueSearch = "";
    }
  }

  searchChange(ev) {
    this.valueSearch = ev.target.value;
    this.subData();
  }

  klikResi(resi: string) {
    this.clip.copy(resi).then(() => {
      this.pipe.alert('Resi', 'Resi berhasil di copy');
    })
  }

  ubahData(id) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: id
      }
    }
    this.pipe.navigate('/laporan/order', navigationExtras);
  }

}
