import { Component, OnInit, ViewChild } from "@angular/core";
import { OrderService } from "src/app/core/services/order.service";
import { Pipe } from "src/app/core/helper/pipe";
import { FormBuilder, Validators } from "@angular/forms";
import { NavigationExtras, ActivatedRoute } from "@angular/router";
import { AlertController, ModalController } from "@ionic/angular";
import { Database } from "src/app/core/helper/db";
import { Printer, PrintOptions } from "@ionic-native/printer/ngx";
import { StateService } from "src/app/core/services/state.service";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { ProductSelectorComponent } from "./components/product-selector/product-selector.component";
import { ProductSelectorStore } from "./components/product-selector-store.service";

@Component({
  selector: "app-order",
  templateUrl: "./order.page.html",
  styleUrls: ["./order.page.scss"],
})
export class OrderPage implements OnInit {
  subscribedData: any = [];
  selectedPilihan: any;
  selectedHargaGC: any;
  selectedHargaHS: any;
  pilihanMedia: any = [];
  pilihanBank: any = [];
  listOrder: any = [];
  validateOrder: any;
  dataOrder: any = {};
  dataProduct: any = [];
  pilihanExpedisi: any = [];
  showDetail: boolean = false;
  showProduct: boolean = false;
  selectedProduct: any;
  showProgressBar: boolean;
  cart: any = [];
  defaultProductImage: any = "assets/svg/box-flat.svg";
  isHidden = true;

  harga: any;
  qty: any = 1;
  total: number = 0;
  selectedBank: any;
  selectedExpedisi: any;
  id: any;

  isMember: boolean;
  isDropship: boolean;
  jenisBayar: any = 0;
  pilihMedia: any = 0;
  pilihEkspedisi: any = 0;
  showSales: boolean = false;
  showMember: boolean = false;
  showBayar: boolean = false;
  dataPilMedia: any;
  dataSales: any;
  dataBank: any;
  dataEkspedisi: any;
  dataMember: any;
  selectedSales: any;
  selectedMember: any;
  constructor(
    private orderService: OrderService,
    private pipe: Pipe,
    private db: Database,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    private printer: Printer,
    private state: StateService,
    private barcodeScanner: BarcodeScanner,
    private modalCtrl: ModalController,
    public productSelectorStore: ProductSelectorStore
  ) {}

  ngOnInit() {
    this._rules();
    this.subscribedData["getData"] = this.orderService
      .getData()
      .subscribe(([product]) => {
        this.dataProduct = product.data;

        this.route.queryParams.subscribe((params) => {
          if (params && params.id) {
            this.selectedPilihan = "";
            this.selectedExpedisi = "";

            this.resetData();

            this.id = params.id;
            this.subscribedData["getOrder"] = this.orderService
              .getOrderById(params.id)
              .subscribe((res: any) => {
                this._rules_update(res.data);
              });
          }
        });
      });

      this.getPilMedia();
      this.getEkspedisi();
      this.getBank();
  }

  setDisplay() {
    if (this.showDetail) {
      this.showDetail = false;
    } else {
      this.showDetail = true;
    }
  }

  async openProduct() {
    const modalProduct = await this.modalCtrl.create({
      component: ProductSelectorComponent,
    });

    await modalProduct.present();

    const response = await modalProduct.onDidDismiss();
    if (response.data) {
      this.selectProduct(response.data, false);
    }
  }

  openBarcode() {
    this.barcodeScanner.scan().then((barcodeData) => {
      this.orderService
        .getProductByBarcode({ barcode: barcodeData.text })
        .subscribe((resp) => {
          this.selectProduct(resp.data, false);
        });
    });
  }

  openSales() {
    if (this.showSales) {
      this.showSales = false;
    } else {
      this.getSales("");
      this.showSales = true;
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

  toggleMember(event: any) {
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
        if (
          this.cart[i].mingros > 0 &&
          this.cart[i].qty > this.cart[i].mingros
        ) {
          this.cart[i].harga = this.cart[i].harga_2;
        } else if (this.isMember && this.validateOrder.get("member").value) {
          this.cart[i].harga = this.cart[i].harga_3;
        } else {
          this.cart[i].harga = this.cart[i].harga_1;
        }
        this.cart[i].diskon_nominal =
          ((this.cart[i].harga * this.cart[i].diskon) / 100) * this.cart[i].qty;
        this.cart[i].total = this.cart[i].harga * this.cart[i].qty;
      }
      resolve(this.cart);
    });
  }

  getBank() {
    this.showProgressBar = true;
    this.orderService.getBank().subscribe(
      (res:any) => {
        this.dataBank = res.data;
        this.showProgressBar = false;
      },
      (err) => {
        this.showProgressBar = false;
      }
    )
  }

  getEkspedisi() {
    this.showProgressBar = true;
    this.orderService.getExpedisi().subscribe(
      (res:any) => {
        this.dataEkspedisi = res.data;
        this.showProgressBar = false;
      },
      (err) => {
        this.showProgressBar = false;
      }
    )
  }

  getPilMedia() {
    this.showProgressBar = true;
    this.orderService.getPilMedia().subscribe(
      (res:any) => {
        this.dataPilMedia = res.data;
        this.showProgressBar = false;
      },
      (err) => {
        this.showProgressBar = false;
      }
    )
  }

  getSales(event) {
    this.showProgressBar = true;
    this.orderService.getSales({ query: event }).subscribe(
      (res: any) => {
        this.dataSales = res.data;
        this.showProgressBar = false;
      },
      (err) => {
        this.showProgressBar = false;
      }
    );
  }

  selectSales(sales, isUpdate) {
    let patchValue = new Promise((resolve, reject) => {
      this.selectedSales = sales;
      this.validateOrder.get("sales").patchValue(sales.nama);
      this.validateOrder.get("id_sales").patchValue(sales.id_users);
      resolve(this.validateOrder);
    });
    patchValue.then((_) => {
      this.mutateCart().then((_) => {
        this.calcTotal();
        this.openSales();
      });
    });
  }

  getMember(event) {
    this.showProgressBar = true;
    this.orderService.getMember({ query: event }).subscribe(
      (res: any) => {
        this.dataMember = res.data;
        this.showProgressBar = false;
      },
      (err) => {}
    );
  }

  selectMember(member, isUpdate) {
    let patchValue = new Promise((resolve, reject) => {
      this.selectedMember = member;
      this.validateOrder.get("member").patchValue(member.nama);
      this.validateOrder.get("id_member").patchValue(member.id_member);
      resolve(this.validateOrder);
    });
    patchValue.then((_) => {
      this.mutateCart().then((_) => {
        this.calcTotal();
        this.openMember();
      });
    });
  }

  selectProduct(product, isUpdate) {
    if (product) {
      this.selectedProduct = product;
      this.selectedProduct.isUpdate = isUpdate;

      console.log(this.harga);

      if (isUpdate) {
        this.qty = this.selectedProduct.qty;
        this.harga = this.selectedProduct.harga;
        // this.calcDiskon(1, 'select');
      } else {
        //jika bukan member dan tidak lebih dari minimal grosir
        this.harga = this.selectedProduct.harga_1 * 1;

        if (this.isMember && this.validateOrder.get("member").value) {
          // jika member
          this.harga = this.selectedProduct.harga_3 * 1;
        }

        if (
          this.selectedProduct.mingros > 0 &&
          this.qty > this.selectedProduct.mingros
        ) {
          //jika qty lebih dari minimal grosir
          this.harga = this.selectedProduct.harga_2 * 1;
        }

        if (this.harga == 0) {
          this.harga = this.selectedProduct.harga_1 * 1;
        }
      }
    } else {
      this.selectedProduct = false;
    }
  }

  addToCart() {
    let addToCart = new Promise((resolve, reject) => {
      let isExist = (element) =>
        element.id_produk_2 == this.selectedProduct.id_produk_2;
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
          diskon_nominal: this.selectedProduct.diskon_nominal
            ? this.selectedProduct.diskon_nominal
            : 0,
          diskon: this.selectedProduct.diskon ? this.selectedProduct.diskon : 0,
        };
      } else {
        if (this.cart[index]) {
          this.cart[index].qty += this.qty;
        } else {
          this.cart.push({
            id_produk_2: this.selectedProduct.id_produk_2,
            nama_produk: this.selectedProduct.nama_produk,
            harga: this.harga,
            qty: this.qty,
            total: this.harga * this.qty,
            harga_1: this.selectedProduct.harga_1,
            harga_2: this.selectedProduct.harga_2,
            harga_3: this.selectedProduct.harga_3,
            mingros: this.selectedProduct.mingros,
            diskon_nominal: this.selectedProduct.diskon_nominal
              ? this.selectedProduct.diskon_nominal
              : 0,
            diskon: this.selectedProduct.diskon
              ? this.selectedProduct.diskon
              : 0,
          });
        }
      }
      resolve(this.cart);
    });

    addToCart.then((_) => {
      this.calcTotal();
      this.resetSelectedProduct();
      this.selectedProduct = false;
      this.showProduct = false;
    });
  }

  updateCart(type, index, value) {
    this.updateCartByIndex(type, index, value).then((res) => {
      this.calcTotal();
    });
  }

  updateCartByIndex(type, index, value): Promise<any> {
    return new Promise((resolve) => {
      if (type == 1) {
        this.cart[index].qty = value * 1;
      } else {
        this.cart[index].harga = value * 1;
      }
      this.cart[index].total =
        this.cart[index].qty * 1 * (this.cart[index].harga * 1);

      resolve(this.cart);
    });
  }

  deleteFromCart() {
    var delFromCart = new Promise((resolve, reject) => {
      let isExist = (element) =>
        element.id_produk_2 == this.selectedProduct.id_produk_2;
      let index = this.cart.findIndex(isExist);
      this.cart.splice(index, 1);
      resolve(this.cart);
    });

    delFromCart.then((res) => {
      this.calcTotal();
      this.resetSelectedProduct();
      this.selectedProduct = false;
      this.showProduct = false;
    });
  }

  calcTotal() {
    let totalBayar = new Promise((resolve, reject) => {
      let ongkir = this.validateOrder.get("ongkir").value;
      this.total = 0;
      for (let key in this.cart) {
        this.total +=
          this.cart[key].total * 1 - this.cart[key].diskon_nominal * 1;
      }
      this.total += ongkir * 1;
      resolve(this.total);
    });

    totalBayar.then((_) => {
      if (this.validateOrder.get("member").value && this.isMember) {
        this.selectedMember.diskon_nominal =
          this.total * (this.selectedMember.diskon / 100);
        this.total -= this.selectedMember.diskon_nominal;
      }
    });
  }

  calcJumlah(qty) {
    console.log(this.selectedProduct);
    if (
      this.selectedProduct.mingros > 0 &&
      qty > this.selectedProduct.mingros
    ) {
      //grosir
      this.harga = this.selectedProduct.harga_2;
    } else if (this.validateOrder.get("member").value && this.isMember) {
      //member
      this.harga = this.selectedProduct.harga_3;
    } else {
      this.harga = this.selectedProduct.harga_1;
    }
    this.calcDiskon(1, "qty");
  }

  calcDiskon(type, log) {
    console.log(this.qty);
    if (type == 1) {
      this.selectedProduct.diskon_nominal =
        this.harga * (this.selectedProduct.diskon / 100) * this.qty;
    } else if (type == 2) {
      this.selectedProduct.diskon =
        (this.selectedProduct.diskon_nominal / (this.harga * this.qty)) * 100;
    }
    console.log(log);
  }

  tambahBayar(nominal) {
    if (nominal == 0) {
      this.validateOrder.get("bayar").patchValue(0);
    } else {
      let bayar = this.validateOrder.get("bayar").value * 1 + nominal;
      this.validateOrder.get("bayar").patchValue(bayar);
    }
  }

  submitOrder() {
    this.pipe.loadingStart();

    if (this.isMember && this.jenisBayar == 2) {
      this.validateOrder.get("pembayaran").patchValue(this.jenisBayar);
    } else {
      this.validateOrder.get("pembayaran").patchValue(1);
    }

    let postField = this.validateOrder.value;
    postField["cart"] = JSON.stringify(this.cart);
    postField["nominal"] = this.total;
    postField["harga"] = this.total - this.validateOrder.get("ongkir").value;

    this.subscribedData["saveData"] = this.orderService
      .save(postField)
      .subscribe(
        (res) => {
          if (this.state.users.print_nota) {
            this.toPrint(res.data);
          } else {
            this.pipe.alert("Berhasil", res.msg);
          }
          this.resetData();
          this.openBayar();
          this.pipe.loadingEnd();
        },
        (err) => {
          this.fallBackResubmit(
            err.error.status ? err.error.status : "Order Gagal",
            err.error.msg
              ? err.error.msg
              : "Order gagal dibuat, silahkan klik simpan lagi."
          );
          this.pipe.loadingEnd();
        }
      );
  }

  toPrint(id) {
    let navExtras: NavigationExtras = {
      queryParams: {
        id: id,
      },
    };
    this.pipe.navigate("/print", navExtras);
  }

  resetSelectedProduct() {
    this.qty = 1;
    this.harga = 0;
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

  async fallBackResubmit(status, msg) {
    const alert = await this.alertCtrl.create({
      header: status,
      message: msg,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            console.log("Confirm Cancel: blah");
            return false;
          },
        },
        {
          text: "Okay",
          handler: () => {
            if (status != "error") {
              this.submitOrder();
            }
          },
        },
      ],
    });

    await alert.present();
  }

  isOpened: boolean = false;
  openSlide(slidingItem) {
    if (this.isOpened) {
      slidingItem.closeOpened();
      this.isOpened = false;
    } else {
      slidingItem.open();
      this.isOpened = true;
    }
  }

  toHariIni() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        data: "hari-ini",
      },
    };
    this.pipe.navigate("/riwayat/order", navigationExtras);
  }

  deleteLaporan(id) {
    this.orderService.deleteById(id);
  }

  ionViewDidLeave() {
    for (let item in this.subscribedData) {
      this.subscribedData[item].unsubscribe();
    }
  }

  trackByFN(item, index) {
    return item.id;
  }

  _rules() {
    console.log(JSON.stringify(this.cart));
    this.validateOrder = this.formBuilder.group({
      nama: [""],
      no_hp: [""],
      kode_pos: [],
      alamat: [""],
      ongkir: [],
      expedisi: [],
      cart: [JSON.stringify(this.cart)],
      media: [],
      bank: [],
      tanggal_transfer: [],
      keterangan: [],
      no_resi: [],
      deadline: "",
      sales: "",
      id_sales: "",
      member: "",
      id_member: "",
      pembayaran: 1,
      bayar: 0,
      kembali: 0,
      biaya_cod: 0,
      nama_pengirim: "",
      alamat_pengirim: "",
      no_hp_pengirim: "",
      nama_penerima: "",
      alamat_penerima: "",
      no_hp_penerima: "",
      transfer: [],
    });
  }

  _rules_update(params: any) {
    this.selectedPilihan = params.media;
    this.selectedBank = params.bank;
    this.selectedExpedisi = params.id_expedisi;
    this.validateOrder = this.formBuilder.group({
      nama: [params.nama_pembeli],
      no_hp: [params.no_hp],
      kode_pos: [""],
      alamat: [params.alamat],
      ongkir: [params.ongkir],
      expedisi: [params.id_expedisi],
      cart: [JSON.stringify(params.cart)],
      media: [params.media],
      bank: [params.bank],
      tanggal_transfer: [params.tanggal_transfer],
      keterangan: [params.keterangan],
      id: [params.id],
      no_resi: [params.no_resi],
      deadline: params.deadline,
      sales: params.sales,
      id_sales: params.id_sales,
      member: params.member,
      id_member: params.id_member,
      pembayaran: params.pembayaran,
      bayar: params.bayar,
      kembali: 0,
      biaya_cod: params.biaya_cod,
      nama_pengirim: params.nama_pengirim,
      alamat_pengirim: params.alamat_pengirim,
      no_hp_pengirim: params.no_hp_pengirim,
      nama_penerima: params.nama_penerima,
      alamat_penerima: params.alamat_penerima,
      no_hp_penerima: params.no_hp_penerima,
      transfer: params.transfer,
    });

    this.total = params.nominal;
    this.cart = params.cart;
  }
}
