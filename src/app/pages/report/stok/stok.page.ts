import { Component, OnInit } from '@angular/core';
import { StokService } from 'src/app/core/services/stok.service';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Pipe } from 'src/app/core/helper/pipe';

@Component({
  selector: 'app-stok',
  templateUrl: './stok.page.html',
  styleUrls: ['./stok.page.scss'],
})
export class StokPage implements OnInit {
  dataStok: any;
  defaultProductImage: any = "assets/svg/box-flat.svg";
  queryParams: any = {
    query: "",
    kategori: "",
    page: 1,
    state: "produk",
  }
  pageTitle = `Stok ${this.queryParams.state}`;
  showProgressBar: boolean = true;

  constructor(
    private stok: StokService,
    private route: ActivatedRoute,
    private pipe: Pipe
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.route.queryParams.subscribe((params) => {
      /**
       * Set current state is it stok produk or stok mati
       */
      if (params && params.state) {
        this.queryParams.state = params.state;
        this.pageTitle = `Stok ${params.state}`;
      }
      this.showProgressBar = true;
      this.stok.getStockProduct(this.queryParams).subscribe((res: any) => {
        this.dataStok = res.data;
        this.showProgressBar = false;
      })
    });
  }

  onSearch(event) {
    this.showProgressBar = true;
    this.queryParams.query = event;
    this.queryParams.page = 1;
    this.stok.getStockProduct(this.queryParams).subscribe((res: any) => {
      this.dataStok = res.data;
      this.showProgressBar = false;
    })
  }

  trackByFn(item) {
    return item.id_produk;
  }

  loadMoreData(event) {
    this.queryParams.page += 1;
    this.stok.getStockProduct(this.queryParams).subscribe((res: any) => {
      for (let item in res.data) {
        this.dataStok.push(res.data[item]);
      }
      event.target.complete();
    })

    if (this.dataStok.length > 5000) {
      alert('Data melebihi 5000 produk');
    }
  }

  formStok(stok) {
    let navExtras: NavigationExtras = {
      queryParams: {
        stok: stok
      }
    }
    this.pipe.navigate('/form-stok', navExtras)
  }

}
