import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { take } from "rxjs/operators";
import { OrderService } from "../../../../../core/services/order.service";
import { CategorySelectorComponent } from "../category-selector/category-selector.component";
import {
  DisplayType,
  ProductSelectorStore,
} from "../product-selector-store.service";

@Component({
  selector: "app-product-selector",
  templateUrl: "./product-selector.component.html",
  styleUrls: ["./product-selector.component.scss"],
})
export class ProductSelectorComponent implements OnInit {
  displayType = DisplayType;
  showProgressBar: boolean;
  dataProduct: any;

  constructor(
    private modalCtrl: ModalController,
    private orderService: OrderService,
    private storage: Storage,
    public productSelectorStore: ProductSelectorStore
  ) {
    this.init();
    this.productSelectorStore.closeModal.subscribe((data) => {
      this.modalCtrl.dismiss(productSelectorStore.selectedProduct);
    });
  }

  async init() {
    const displayTypeStorage = await this.storage.get("displayType");
    this.productSelectorStore.displayType =
      displayTypeStorage != null
        ? displayTypeStorage === 0
          ? DisplayType.Grid
          : DisplayType.List
        : DisplayType.List;
  }

  ngOnInit() {
    this.getProduct("", "");
  }

  getProduct(event: any, kategori?: any) {
    this.showProgressBar = true;
    try {
      this.orderService
        .getProduct({ query: event, kategori: kategori })
        .pipe(take(1))
        .subscribe(
          (res: any) => {
            this.productSelectorStore.products = res.data;
            this.showProgressBar = false;
          },
          (err) => {
            this.showProgressBar = false;
          }
        );
    } catch (e) {
      this.showProgressBar = false;
    }
  }

  async openCategoryModal() {
    const modalCategory = await this.modalCtrl.create({
      component: CategorySelectorComponent,
    });

    const present = await modalCategory.present();
    const response = await modalCategory.onDidDismiss();

    if (response.data) {
      this.getProduct(
        "",
        this.productSelectorStore.selectedCategory.id_kategori
      );
    }
  }

  async setDisplay(type: DisplayType) {
    await this.storage.set("displayType", type);
    this.productSelectorStore.displayType = type;
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
