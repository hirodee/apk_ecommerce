import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-penjualan',
  templateUrl: './penjualan.page.html',
  styleUrls: ['./penjualan.page.scss'],
})
export class PenjualanPage implements OnInit {
  currDate = new Date().toJSON().slice(0, 10);
  constructor() { }

  ngOnInit() {
  }

}
