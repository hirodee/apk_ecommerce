import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Pipe } from 'src/app/core/helper/pipe';
import { OrderService } from 'src/app/core/services/order.service';
import { ReturService } from 'src/app/core/services/retur.service';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.component.html',
  styleUrls: ['./manual.component.scss'],
})
export class ManualComponent implements OnInit {
  selectedPilihan: any;
  dataOrder: any = {};
  selectedHargaGC: any;
  selectedHargaHS: any;
  validateOrder: any;
  cart: any = [];
  showDetail: any;
  showProduct: any;
  showMember: any;
  showBayar: any;
  showProgressBar: boolean;
  dataProduct: any;
  isMember: any;
  dataMember: any;
  selectedMember: any;
  selectedProduct: any;
  qty: any;
  total: number = 0;
  jenisBayar: number;
  subscribedData: any;
  selectedExpedisi: string;
  harga: any;
  defaultProductImage: any = "assets/svg/box-flat.svg";

  constructor(
    private formBuilder: FormBuilder,
    private pipe: Pipe,
    private orderService: OrderService,
    private retur: ReturService
  ) { }

  ngOnInit() {
    this._rules()
    this.getProduct("");
  }

  setDisplay() {
    if (this.showDetail) {
      this.showDetail = false;
    } else {
      this.showDetail = true;
    }
  }

  openProduct() {
    if (this.showProduct) {
      this.showProduct = false;
    } else {
      this.showProduct = true;
    }
  }

  openMember() {
    if (this.showMember) {
      this.showMember = false;
    } else {
      this.showMember = true;
    }
  }

  openBayar() {
    if (this.showBayar) {
      this.showBayar = false;
    } else {
      this.showBayar = true;
    }
  }

  createRetur() {
    this.pipe.loadingStart();

    if (this.jenisBayar == 2) {
      this.validateOrder.get('pembayaran').patchValue(this.jenisBayar);
    }

    let postField = this.validateOrder.value;
    postField['cart'] = JSON.stringify(this.cart);
    postField['nominal'] = this.total;
    postField['harga'] = this.total - this.validateOrder.get('ongkir').value;

    this.subscribedData["saveData"] = this.retur.createReturManual(postField).subscribe((res) => {
      this.pipe.alert("Berhasil", res.msg);
      this.resetData();
      this.pipe.loadingEnd()
    }, (err) => {
      this.fallBackResubmit((err.error.status) ? err.error.status : "Order Gagal", (err.error.msg) ? err.error.msg : "Order gagal dibuat, silahkan klik simpan lagi.");
      this.pipe.loadingEnd();
    });
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

  toggleMember(event) {
    if (event) {
      this.getMember("");
    }
    //perbarui cart collection
    this.mutateCart().then((_) => {
      this.calcTotal();
    });
    //recek total bayar
  }

  mutateCart(): Promise<any> {
    return new Promise((resolve, reject) => {
      for (let i in this.cart) {
        if (this.cart[i].qty > this.cart[i].mingros) {
          this.cart[i].harga = this.cart[i].harga_2;
        } else if (this.isMember && this.validateOrder.get('member').value) {
          this.cart[i].harga = this.cart[i].harga_3;
        } else {
          this.cart[i].harga = this.cart[i].harga_1;
        }
        this.cart[i].diskon_nominal = (this.cart[i].harga * this.cart[i].diskon / 100) * this.cart[i].qty;
        this.cart[i].total = this.cart[i].harga * this.cart[i].qty;
      }
      resolve(this.cart);
    });
  }

  getMember(event) {
    this.showProgressBar = true;
    this.orderService.getMember(
      { query: event }
    ).subscribe((res: any) => {
      this.dataMember = res.data;
      this.showProgressBar = false;
    }, (err) => {

    });
  }

  selectMember(member, isUpdate) {
    let patchValue = new Promise((resolve, reject) => {
      this.selectedMember = member;
      this.validateOrder.get('member').patchValue(member.nama);
      this.validateOrder.get('id_member').patchValue(member.id_member);
      resolve(this.validateOrder);
    });
    patchValue.then((_) => {
      this.mutateCart().then((_) => {
        this.calcTotal();
        this.openMember();
      });
    })
  }

  selectProduct(product, isUpdate) {
    if (product) {
      this.selectedProduct = product;
      this.selectedProduct.isUpdate = isUpdate;

      console.log(this.harga)

      if (isUpdate) {
        this.qty = this.selectedProduct.qty;
        this.harga = this.selectedProduct.harga;
        // this.calcDiskon(1, 'select');
      } else {
        if (this.isMember && this.validateOrder.get('member').value) {
          // jika member
          this.harga = this.selectedProduct.harga_3;
        } else if (this.qty > this.selectedProduct.mingros) {
          //jika qty lebih dari minimal grosir
          this.harga = this.selectedProduct.harga_2;
        } else {
          //jika bukan member dan tidak lebih dari minimal grosir
          this.harga = this.selectedProduct.harga_1;
        }
      }

    } else {
      this.selectedProduct = false;
    }
  }

  addToCart() {
    let addToCart = new Promise((resolve, reject) => {
      let isExist = (element) => element.id_produk_2 == this.selectedProduct.id_produk_2;
      let index = this.cart.findIndex(isExist);
      if (this.selectedProduct.isUpdate) {
        this.cart[index] = {
          id_produk_2: this.selectedProduct.id_produk_2,
          nama_produk: this.selectedProduct.nama_produk,
          harga: this.harga,
          harga_1: this.selectedProduct.harga_1,
          harga_2: this.selectedProduct.harga_2,
          harga_3: this.selectedProduct.harga_3,
          mingros: this.selectedProduct.mingros,
          qty: this.qty,
          total: this.harga * this.qty,
          diskon_nominal: (this.selectedProduct.diskon_nominal) ? this.selectedProduct.diskon_nominal : 0,
          diskon: (this.selectedProduct.diskon) ? this.selectedProduct.diskon : 0
        }
      } else {
        if (this.cart[index]) {
          this.cart[index].qty += this.qty;
        } else {
          this.cart.push(
            {
              id_produk_2: this.selectedProduct.id_produk_2,
              nama_produk: this.selectedProduct.nama_produk,
              harga: this.harga,
              qty: this.qty,
              total: this.harga * this.qty,
              harga_1: this.selectedProduct.harga_1,
              harga_2: this.selectedProduct.harga_2,
              harga_3: this.selectedProduct.harga_3,
              mingros: this.selectedProduct.mingros,
              diskon_nominal: (this.selectedProduct.diskon_nominal) ? this.selectedProduct.diskon_nominal : 0,
              diskon: (this.selectedProduct.diskon) ? this.selectedProduct.diskon : 0
            }
          );
        }
      }
      resolve(this.cart);
    })

    addToCart.then((_) => {
      this.calcTotal();
      this.resetSelectedProduct();
      this.selectedProduct = false;
      this.showProduct = false;
    })
  }

  updateCart(type, index, value) {
    this.updateCartByIndex(type, index, value).then((res) => {
      this.calcTotal();
    })
  }

  updateCartByIndex(type, index, value): Promise<any> {
    return new Promise((resolve) => {
      if (type == 1) {
        this.cart[index].qty = value * 1;
      } else {
        this.cart[index].harga = value * 1;
      }
      this.cart[index].total = (this.cart[index].qty * 1) * (this.cart[index].harga * 1);

      resolve(this.cart);
    });
  }

  deleteFromCart() {
    var delFromCart = new Promise((resolve, reject) => {
      let isExist = (element) => element.id_produk_2 == this.selectedProduct.id_produk_2;
      let index = this.cart.findIndex(isExist);
      this.cart.splice(index, 1);
      resolve(this.cart);
    });

    delFromCart.then((res) => {
      this.calcTotal();
      this.resetSelectedProduct();
      this.selectedProduct = false;
      this.showProduct = false;
    })
  }

  calcTotal() {
    let totalBayar = new Promise((resolve, reject) => {
      let ongkir = this.validateOrder.get('ongkir').value;
      this.total = 0;
      for (let key in this.cart) {
        this.total += (this.cart[key].total * 1) - (this.cart[key].diskon_nominal * 1);
      }
      this.total += ongkir * 1;
      resolve(this.total);
    });

    totalBayar.then((_) => {
      if (this.validateOrder.get('member').value && this.isMember) {
        this.selectedMember.diskon_nominal = this.total * (this.selectedMember.diskon / 100);
        this.total -= this.selectedMember.diskon_nominal;
      }
    })
  }

  calcJumlah(qty) {
    console.log(this.selectedProduct);
    if (qty > this.selectedProduct.mingros) {
      //grosir
      this.harga = this.selectedProduct.harga_2;
    } else if (this.validateOrder.get('member').value && this.isMember) {
      //member
      this.harga = this.selectedProduct.harga_3;
    } else {
      this.harga = this.selectedProduct.harga_1;
    }
    this.calcDiskon(1, 'qty');
  }

  calcDiskon(type, log) {
    if (type == 1) {
      this.selectedProduct.diskon_nominal = (this.harga * this.selectedProduct.diskon / 100) * this.qty;
    } else if (type == 2) {
      this.selectedProduct.diskon = this.selectedProduct.diskon_nominal / (this.harga * this.qty) * 100;
    }
    console.log(log);
  }

  tambahBayar(nominal) {
    if (nominal == 0) {
      this.validateOrder.get('bayar').patchValue(0);
    } else {
      let bayar = (this.validateOrder.get('bayar').value * 1) + nominal;
      this.validateOrder.get('bayar').patchValue(bayar);
    }
  }

  submitOrder() {
    this.pipe.loadingStart();

    if (this.jenisBayar == 2) {
      this.validateOrder.get('pembayaran').patchValue(this.jenisBayar);
    }

    let postField = this.validateOrder.value;
    postField['cart'] = JSON.stringify(this.cart);
    postField['nominal'] = this.total;
    postField['harga'] = this.total - this.validateOrder.get('ongkir').value;

    this.subscribedData["saveData"] = this.orderService.save(postField).subscribe((res) => {
      this.pipe.alert("Berhasil", res.msg);
      this.resetData();
      this.pipe.loadingEnd()
    }, (err) => {
      this.fallBackResubmit((err.error.status) ? err.error.status : "Order Gagal", (err.error.msg) ? err.error.msg : "Order gagal dibuat, silahkan klik simpan lagi.");
      this.pipe.loadingEnd();
    });
  }
  fallBackResubmit(arg0: any, arg1: any) {
    throw new Error("Method not implemented.");
  }


  resetSelectedProduct() {
    this.qty = "";
    this.harga = "";
    this.selectedProduct = {};
  }

  resetData() {
    this.selectedPilihan = "";
    this.selectedExpedisi = "";
    this.validateOrder.reset();
    this.cart = [];
    this.total = 0;
    this.selectedMember = "";
  }

  _rules() {
    console.log(JSON.stringify(this.cart));
    this.selectedPilihan = this.dataOrder.media;
    this.selectedHargaGC = this.dataOrder.hargagc;
    this.selectedHargaHS = this.dataOrder.hargahs;
    this.validateOrder = this.formBuilder.group({
      nama: [''],
      no_hp: [''],
      kode_pos: [],
      alamat: [''],
      ongkir: [0],
      expedisi: [],
      cart: [JSON.stringify(this.cart)],
      media: [this.dataOrder.media],
      bank: [this.dataOrder.bank],
      tanggal_transfer: [this.dataOrder.tanggal_transfer],
      keterangan: [this.dataOrder.keterangan],
      no_resi: [],
      deadline: "",
      member: '',
      id_member: '',
      pembayaran: 1,
      bayar: 0,
      kembali: 0
    });
  }

}
