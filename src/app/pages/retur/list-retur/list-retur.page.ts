import { Component, OnInit } from '@angular/core';
import { ReturService } from 'src/app/core/services/retur.service';
import { NavigationExtras } from '@angular/router';
import { Pipe } from '../../../core/helper/pipe';

@Component({
  selector: 'app-list-retur',
  templateUrl: './list-retur.page.html',
  styleUrls: ['./list-retur.page.scss'],
})
export class ListReturPage implements OnInit {
  currDate = new Date().toJSON().slice(0, 10);
  queryParams: any = {
    dari: this.currDate,
    sampai: this.currDate,
    query: ''
  }
  dataRetur: any = [];
  constructor(
    private retur: ReturService,
    private pipe: Pipe
  ) { }

  ngOnInit() {
    this.retur.getReturList(this.queryParams).subscribe((res) => {
      this.dataRetur = res.data;
    })
  }

  openDetailFaktur(id_retur) {
    // alert(id_retur)
    let navExtras: NavigationExtras = {
      queryParams: {
        id_retur: id_retur
      }
    }
    this.pipe.navigate('/detail-retur', navExtras);
  }

}
