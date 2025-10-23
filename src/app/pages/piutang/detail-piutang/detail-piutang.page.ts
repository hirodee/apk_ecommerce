import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Pipe } from 'src/app/core/helper/pipe';

@Component({
  selector: 'app-detail-piutang',
  templateUrl: './detail-piutang.page.html',
  styleUrls: ['./detail-piutang.page.scss'],
})
export class DetailPiutangPage implements OnInit {

  piutang: any = {};
  constructor(
    private route: ActivatedRoute,
    private pipe: Pipe
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params && params.piutang) {
        this.piutang = params.piutang;
      }
    })
  }

  updatePiutang() {
    let navExtras: NavigationExtras = {
      queryParams: {
        piutang: this.piutang
      }
    }
    this.pipe.navigate('/form-piutang', navExtras)
  }

}
