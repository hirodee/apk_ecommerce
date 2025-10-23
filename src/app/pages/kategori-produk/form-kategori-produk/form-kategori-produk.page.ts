import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { KategoriService } from 'src/app/core/services/kategori.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-form-kategori-produk',
  templateUrl: './form-kategori-produk.page.html',
  styleUrls: ['./form-kategori-produk.page.scss'],
})
export class FormKategoriProdukPage implements OnInit {

  kategori: any = {
    id_kategori_2: "",
    nama_kategori: ""
  };
  constructor(
    private route: ActivatedRoute,
    private kategoriService: KategoriService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params && params.kategori) {
        this.kategori = params.kategori;
      }
    })
  }

  saveKategori() {
    this.kategoriService.saveData(this.kategori).toPromise().then((res: any) => {
      let navExtras: NavigationExtras = {
        queryParams: {
          kategori: res.data
        }
      }
      if (this.kategori.id_kategori_2 != "") {
        this.navCtrl.navigateBack("/detail-kategori-produk", navExtras);
      } else {
        this.navCtrl.navigateBack("/kategori-produk", navExtras);
      }
    });
  }


}
