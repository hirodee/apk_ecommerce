import { Component, OnInit } from '@angular/core';
import { SatuanService } from 'src/app/core/services/satuan.service';
import { NavigationExtras, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-form-satuan-produk',
  templateUrl: './form-satuan-produk.page.html',
  styleUrls: ['./form-satuan-produk.page.scss'],
})
export class FormSatuanProdukPage implements OnInit {

  satuan: any = {
    id_satuan: "",
    satuan: ""
  };
  constructor(
    private satuanService: SatuanService,
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params && params.satuan) {
        this.satuan = params.satuan;
      }
    })
  }

  saveSatuan() {
    this.satuanService.saveData(this.satuan).toPromise().then((res: any) => {
      let navExtras: NavigationExtras = {
        queryParams: {
          satuan: res.data
        }
      }
      if (this.satuan.id_satuan != "") {
        this.navCtrl.navigateBack("/detail-satuan-produk", navExtras);
      } else {
        this.navCtrl.navigateBack("/satuan-produk", navExtras);
      }
    });
  }

}
