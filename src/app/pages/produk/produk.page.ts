import { Component, OnInit } from '@angular/core';
import { ProdukService } from 'src/app/core/services/produk.service';
import { NavigationExtras, ActivatedRoute } from '@angular/router';
import { Pipe } from '../../core/helper/pipe';

@Component({
  selector: 'app-produk',
  templateUrl: './produk.page.html',
  styleUrls: ['./produk.page.scss'],
})
export class ProdukPage implements OnInit {

  itSearch: boolean = false;
  valueSearch: string;
  dataProduk: any = [];
  defaultProductImage: any = "assets/svg/box-flat.svg";
  showProgressBar: boolean = true;

  constructor(
    private product: ProdukService,
    private pipe: Pipe,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.route.queryParams.subscribe((params) => {
      if (params && params.produk) {
        let findIndex = (dataProduk) => dataProduk.id_produk_2 == params.produk.id_produk_2;
        let index = this.dataProduk.findIndex(findIndex);
        this.dataProduk[index] = params.produk;
      }
    })
    this.showProgressBar = true;
    this.product.getProduct({ query: "", kategori: "" }).subscribe((res: any) => {
      this.dataProduk = res.data;
      this.showProgressBar = false;
    });
  }

  toggleSearch() {
    if (!this.itSearch) {
      this.itSearch = true;
    } else {
      this.itSearch = false;
      this.valueSearch = "";
    }
  }

  onSearchChange(value) {
    this.showProgressBar = true;
    this.product.getProduct({ query: value, kategori: "" }).subscribe((res: any) => {
      this.dataProduk = res.data;
      this.showProgressBar = false;
    });
  }

  openProduct(produk) {
    let navExtras: NavigationExtras = {
      queryParams: {
        produk: produk
      }
    }
    this.pipe.navigate('produk-detail', navExtras)
  }



}
