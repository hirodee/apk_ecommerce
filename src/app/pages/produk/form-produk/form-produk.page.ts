import { Component, OnInit } from '@angular/core';
import { SatuanService } from 'src/app/core/services/satuan.service';
import { KategoriService } from 'src/app/core/services/kategori.service';
import { combineLatest } from 'rxjs';
import { ProdukService } from 'src/app/core/services/produk.service';
import { NavController } from '@ionic/angular';
import { NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-produk',
  templateUrl: './form-produk.page.html',
  styleUrls: ['./form-produk.page.scss'],
})
export class FormProdukPage implements OnInit {
  dataKategori: any = [];
  dataSatuan: any = [];
  produk: any = {};
  showProgressBar: boolean = true;
  constructor(
    private satuan: SatuanService,
    private kategori: KategoriService,
    private produkService: ProdukService,
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.showProgressBar = true;

    let kategori = this.kategori.getData({ query: '' });
    let satuan = this.satuan.getSatuan({ query: '' });
    let generateBarcode = this.produkService.generateBarcode();

    let data = combineLatest([kategori, satuan, generateBarcode]);

    data.toPromise().then(([kategori, satuan, generateBarcode]) => {
      this.dataKategori = kategori.data;
      this.dataSatuan = satuan.data;
      this.produk.barcode = generateBarcode.data;

      this.route.queryParams.subscribe((params) => {
        console.log(params)
        if (params && params.produk) {
          this.produk = params.produk;
          this.produk.old_gambar = params.produk.gambar;
          this.produk.old_url_gambar = params.produk.url_gambar;
          // this.produk.gambar = {};
          console.log(params.produk)
          this.showProgressBar = false;
        } else {
          this.showProgressBar = false;
        }
      })
    })
  }

  save() {
    this.produkService.save(this.produk).toPromise().then((data) => {
      this.produk = data.data;
      let navExtras: NavigationExtras = {
        queryParams: {
          produk: data.data
        }
      }
      this.navCtrl.navigateBack('/produk', navExtras)
    })
  }

  setImage(images) {
    this.produk.gambar = images;
    console.log(this.produk)
  }

}
