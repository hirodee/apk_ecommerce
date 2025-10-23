import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivityService } from 'src/app/core/services/activity.service';
import { Pipe } from 'src/app/core/helper/pipe';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/core/services/order.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-aktivitas',
  templateUrl: './aktivitas.page.html',
  styleUrls: ['./aktivitas.page.scss'],
})
export class AktivitasPage implements OnInit {

  validateReport: any;
  dataActivity: any = {};
  tanggalMap: any = [];
  tanggal: any;
  subscribedData: any = [];
  pilMedia: any;

  tempData: any = [];
  showProduct: any;
  showProgressBar: boolean;
  dataProduct: any;
  selectedProduct: any;
  pilProduct: any;
  selectedMedia: any;
  qty: any;
  dataQty: any = [];
  dataProdukForm: any = [];
  isUpdated: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private activityService: ActivityService,
    private orderService: OrderService,
    private pipe: Pipe,
    private route: ActivatedRoute
  ) {
    var d = new Date();
    d.setDate(d.getDate() - 1);
    var n = new Date();

    let dday = d.getDate();
    let dmonth = ("0" + (d.getMonth() + 1)).slice(-2);
    let dyear = d.getFullYear();

    let currdate = dday + '-' + dmonth + '-' + dyear;

    let nday = n.getDate();
    let nmonth = ("0" + (n.getMonth() + 1)).slice(-2);
    let nyear = n.getFullYear();

    let pastdate = nday + '-' + nmonth + '-' + nyear;

    this.tanggalMap = [pastdate, currdate];
  }


  ngOnInit() {
    this._rules();
    this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.isUpdated = true;
        this.activityService.getById(params.id).subscribe((res: any) => {
          this.dataQty = res.data.detail;
          this._update(res.data);
        });
      } else {
        this.isUpdated = false;
      }
    })
    this.activityService.getDateAvailableActivity().subscribe((res: any) => {
      this.tanggalMap = res.data;
      if (!this.isUpdated) {
        this.tanggal = formatDate(Date.now(), 'dd-MM-yyyy', 'EN');
      }
    });
    this.orderService.getPilMedia().subscribe((res: any) => {
      this.pilMedia = res.data;
      for (let item in this.pilMedia) {
        this.dataQty.push({
          id: this.pilMedia[item].id,
          media: this.pilMedia[item].media,
          produk: []
        })
      }
    });
    this.orderService.getProduct({ query: "" }).subscribe((res: any) => {
      this.dataProduct = res.data;
    });
  }

  openProduct() {
    if (this.showProduct) {
      this.showProduct = false;
    } else {
      this.showProduct = true;
    }
  }

  getProduct(event) {
    console.log(event)
    this.showProgressBar = true;
    this.orderService.getProduct(
      { query: event }
    ).subscribe((res: any) => {
      this.dataProduct = res.data;
      this.showProgressBar = false;
    }, (err) => {

    });
  }

  selectProduct(product) {
    if (product) {
      this.selectedProduct = product;
    } else {
      this.selectedProduct = false;
    }
  }

  addToTemp() {
    let filterMedia = (element) => element.id == this.selectedMedia;
    let currentMedia = this.dataQty.findIndex(filterMedia);
    let filterProduct = (element) => element.id_produk_2 == this.selectedProduct.id_produk_2;
    let currentProduct = this.dataQty[currentMedia].produk.findIndex(filterProduct);

    let product = this.dataQty[currentMedia].produk[currentProduct];
    if (product) {
      this.dataQty[currentMedia].produk[currentProduct].qty += this.qty * 1;
    } else {
      this.dataQty[currentMedia].produk.push({
        id_produk_2: this.selectedProduct.id_produk_2,
        nama_produk: this.selectedProduct.nama_produk,
        qty: this.qty * 1
      });
    }

    console.log(this.dataQty);

    this.selectedProduct = false;
    this.showProduct = false;
  }

  changeQty(i, id, qty) {
    this.dataQty[i].produk[id].qty = qty;
  }

  saveActivity() {
    for (let i in this.dataQty) {
      for (let id in this.dataQty[i].produk) {
        this.dataProdukForm.push({
          media: this.dataQty[i].id,
          id_produk: this.dataQty[i].produk[id].id_produk_2,
          jumlah: this.dataQty[i].produk[id].qty
        });
      }
    }
    this.validateReport.get('produk').patchValue(JSON.stringify(this.dataProdukForm));

    console.log(this.validateReport.value)
    this.subscribedData["saveData"] = this.activityService.save(this.validateReport.value).subscribe((res) => {
      this.pipe.alert("Pesan", res.data);
      this.pipe.next("riwayat/aktivitas");
    }, (err) => {
      this.pipe.alert("Gagal", "Data gagal disimpan, Silahkan coba lagi jika tetap gagal silahkan hubungi tim IT");
    });
  }

  ngOnDestroy() {

  }

  ionViewDidLeave() {
    for (let key in this.subscribedData) {
      this.subscribedData[key].unsubscribe();
    }
  }

  _rules() {
    return this.validateReport = this.formBuilder.group({
      tanggal: [this.dataActivity.tanggal, Validators.compose([Validators.required])],
      leads: [this.dataActivity.leads, Validators.compose([Validators.required])],
      totalan: [this.dataActivity.totalan, Validators.compose([Validators.required])],
      closing: [this.dataActivity.closing],
      produk: [JSON.stringify(this.dataProdukForm)],
      id: [''],
    });
  }

  _update(params: any) {
    this.validateReport.get("tanggal").patchValue(params.tanggal, { emmitEvent: false });
    this.validateReport.get("leads").patchValue(params.leads, { emmitEvent: false });
    this.validateReport.get("totalan").patchValue(params.totalan, { emmitEvent: false });
    this.validateReport.get("closing").patchValue(params.closing, { emmitEvent: false });
    this.validateReport.get("id").patchValue(params.id, { emmitEvent: false });
  }

}
