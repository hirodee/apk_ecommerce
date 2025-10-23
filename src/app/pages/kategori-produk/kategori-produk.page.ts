import { Component, OnInit } from '@angular/core';
import { KategoriService } from 'src/app/core/services/kategori.service';
import { NavigationExtras, ActivatedRoute } from '@angular/router';
import { Pipe } from '../../core/helper/pipe';

@Component({
  selector: 'app-kategori-produk',
  templateUrl: './kategori-produk.page.html',
  styleUrls: ['./kategori-produk.page.scss'],
})
export class KategoriProdukPage implements OnInit {

  dataKategori: any = [];
  constructor(
    private kategori: KategoriService,
    private pipe: Pipe,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params && params.kategori) {
        this.dataKategori.push(params.kategori);
      }

      if (params && params.deleteItem) {
        //remove deleted kategori from collection
        this.dataKategori = this.dataKategori.filter(item => item.id_kategori_2 !== params.deleteItem.id_kategori_2)
      }
    })

    this.kategori.getData({ query: "" }).subscribe((res) => {
      this.dataKategori = res.data;
      console.log(res.data)
    })
  }

  onSearch(query) {
    this.kategori.getData({ query: query }).subscribe((res) => {
      this.dataKategori = res.data;
    })
  }

  openDetail(item) {
    let navExtras: NavigationExtras = {
      queryParams: {
        kategori: item
      }
    }

    this.pipe.navigate('/detail-kategori-produk', navExtras);
  }


}
