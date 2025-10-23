import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';
import { ReturService } from 'src/app/core/services/retur.service';

@Component({
  selector: 'app-faktur',
  templateUrl: './faktur.component.html',
  styleUrls: ['./faktur.component.scss'],
})
export class FakturComponent implements OnInit {
  query: any = "022004145";
  detailOrder: any = {};
  constructor(
    private order: OrderService,
    private retur: ReturService
  ) { }

  ngOnInit() { }

  searchFaktur() {
    this.order.getDetailOrder({ query: this.query }).subscribe((res) => {
      this.detailOrder = res.data;
    })
  }

  createRetur() {
    this.retur.createReturFaktur({ no_faktur: this.query }).subscribe((res) => {
      alert("Retur berhasil dibuat");
    })
  }

}
