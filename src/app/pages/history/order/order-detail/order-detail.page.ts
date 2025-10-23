import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { OrderService } from 'src/app/core/services/order.service';
import { Pipe } from '../../../../core/helper/pipe';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {

  detailOrder: any = {};
  constructor(
    private route: ActivatedRoute,
    private order: OrderService,
    private pipe: Pipe,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.order.getDetailOrder({ id: params.id }).subscribe((res) => {
        this.detailOrder = res.data
      })
    })
  }

  toPrint(id) {
    let navExtras: NavigationExtras = {
      queryParams: {
        id: id
      }
    }
    this.pipe.navigate('/print', navExtras);
  }

}
