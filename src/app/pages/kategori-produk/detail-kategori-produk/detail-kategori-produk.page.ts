import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Pipe } from '../../../core/helper/pipe';
import { KategoriService } from 'src/app/core/services/kategori.service';


@Component({
  selector: 'app-detail-kategori-produk',
  templateUrl: './detail-kategori-produk.page.html',
  styleUrls: ['./detail-kategori-produk.page.scss'],
})
export class DetailKategoriProdukPage implements OnInit {

  kategori: any = {};
  constructor(
    private route: ActivatedRoute,
    private pipe: Pipe,
    private kategoriService: KategoriService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params && params.kategori) {
        this.kategori = params.kategori;
      }
    })
  }

  updateKategori() {
    let navExtras: NavigationExtras = {
      queryParams: {
        kategori: this.kategori
      }
    }
    this.pipe.navigate('/form-kategori-produk', navExtras)
  }

  deleteKategori() {
    this.kategoriService.deleteKategori({ id_kategori_2: this.kategori.id_kategori_2 }).toPromise().then((_) => {
      let navExtras: NavigationExtras = {
        queryParams: {
          deleteItem: this.kategori
        }
      }
      this.pipe.navigate("/kategori-produk", navExtras)
    })
  }

}
