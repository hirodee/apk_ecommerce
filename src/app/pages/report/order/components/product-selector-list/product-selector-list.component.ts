import { Component, Input, OnInit } from "@angular/core";
import { ProductSelectorStore } from "../product-selector-store.service";

@Component({
  selector: "app-product-selector-list",
  templateUrl: "./product-selector-list.component.html",
  styleUrls: ["./product-selector-list.component.scss"],
})
export class ProductSelectorListComponent implements OnInit {
  defaultProductImage: any = "assets/svg/box-flat.svg";

  constructor(public productSelectorStore: ProductSelectorStore) {}

  ngOnInit() {}

  selectProduct(item) {
    this.productSelectorStore.selectProduct(item);
  }
}
