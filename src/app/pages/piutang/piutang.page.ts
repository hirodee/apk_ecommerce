import { Component, OnInit } from '@angular/core';
import { PiutangService } from 'src/app/core/services/piutang.service';
import { NavigationExtras } from '@angular/router';
import { Pipe } from '../../core/helper/pipe';

@Component({
  selector: 'app-piutang',
  templateUrl: './piutang.page.html',
  styleUrls: ['./piutang.page.scss'],
})
export class PiutangPage implements OnInit {

  showProgressBar: boolean = true;
  dataPiutang: any = [];
  constructor(
    private piutang: PiutangService,
    private pipe: Pipe
  ) { }

  ngOnInit() {
    this.showProgressBar = true;
    this.piutang.getData({ query: "" }).subscribe((res) => {
      this.dataPiutang = res.data;
      this.showProgressBar = false;
    })
  }

  onSearch(query) {
    this.showProgressBar = true;
    this.piutang.getData({ query: query }).subscribe((res) => {
      this.showProgressBar = false;
      this.dataPiutang = res.data;
    })
  }

  openPiutang(item) {
    let navExtras: NavigationExtras = {
      queryParams: {
        piutang: item
      }
    }
    this.pipe.navigate('/detail-piutang', navExtras);
  }

}
