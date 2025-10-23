import { Component, OnInit } from '@angular/core';
import { Pipe } from 'src/app/core/helper/pipe';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { SatuanService } from 'src/app/core/services/satuan.service';

@Component({
  selector: 'app-detail-satuan-produk',
  templateUrl: './detail-satuan-produk.page.html',
  styleUrls: ['./detail-satuan-produk.page.scss'],
})
export class DetailSatuanProdukPage implements OnInit {

  satuan: any = {};
  constructor(
    private route: ActivatedRoute,
    private pipe: Pipe,
    private satuanService: SatuanService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params && params.satuan) {
        this.satuan = params.satuan;
      }
    })
  }

  updateSatuan() {
    let navExtras: NavigationExtras = {
      queryParams: {
        satuan: this.satuan
      }
    }
    this.pipe.navigate('/form-satuan-produk', navExtras)
  }

  deleteSatuan() {
    this.satuanService.deleteSatuan({ id_satuan: this.satuan.id_satuan }).toPromise().then((_) => {
      let navExtras: NavigationExtras = {
        queryParams: {
          deleteItem: this.satuan
        }
      }
      this.pipe.navigate("/satuan-produk", navExtras)
    })
  }

}
