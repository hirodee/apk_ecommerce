import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReturService } from 'src/app/core/services/retur.service';

@Component({
  selector: 'app-detail-retur',
  templateUrl: './detail-retur.page.html',
  styleUrls: ['./detail-retur.page.scss'],
})
export class DetailReturPage implements OnInit {

  detailRetur: any = {};
  constructor(
    private route: ActivatedRoute,
    private retur: ReturService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params && params.id_retur) {
        this.retur.getDetailRetur(params.id_retur).subscribe((res: any) => {
          this.detailRetur = res.data;
        })
      }
    })
  }

}
