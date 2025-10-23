import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Pipe } from 'src/app/core/helper/pipe';
import { ScrollDetail } from '@ionic/core';

@Component({
  selector: 'app-produk-detail',
  templateUrl: './produk-detail.page.html',
  styleUrls: ['./produk-detail.page.scss'],
})
export class ProdukDetailPage implements OnInit {
  produk: any = {};
  defaultProductImage: any = "assets/svg/box-flat.svg";
  showToolbar: boolean;

  constructor(
    private route: ActivatedRoute,
    private pipe: Pipe
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params && params.produk) {
        this.produk = params.produk
        console.log(this.produk)
      }
    })
  }

  updateProduk() {
    let navExtras: NavigationExtras = {
      queryParams: {
        produk: this.produk
      }
    }
    this.pipe.navigate("/form-produk", navExtras)
  }

  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 75;
    }
    console.log(this.showToolbar);
  }

}
