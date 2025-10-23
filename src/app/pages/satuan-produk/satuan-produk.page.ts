import { Component, OnInit } from '@angular/core';
import { SatuanService } from 'src/app/core/services/satuan.service';
import { NavigationExtras } from '@angular/router';
import { Pipe } from '../../core/helper/pipe';

@Component({
  selector: 'app-satuan-produk',
  templateUrl: './satuan-produk.page.html',
  styleUrls: ['./satuan-produk.page.scss'],
})
export class SatuanProdukPage implements OnInit {

  dataSatuan: any = [];
  constructor(
    private satuan: SatuanService,
    private pipe: Pipe
  ) { }

  ngOnInit() {
    this.satuan.getSatuan({ query: '' }).subscribe((res: any) => {
      this.dataSatuan = res.data
    })
  }

  openDetail(item) {
    let navExtras: NavigationExtras = {
      queryParams: {
        satuan: item
      }
    }

    this.pipe.navigate('/detail-satuan-produk', navExtras);
  }

  onSearch(query) {
    this.satuan.getSatuan({ query: query }).subscribe((res: any) => {
      this.dataSatuan = res.data;
    })
  }

}
