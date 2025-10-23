import { Component, Input, OnInit } from "@angular/core";
import { ProductSelectorStore } from "../product-selector-store.service";

@Component({
  selector: "app-product-selector-grid",
  templateUrl: "./product-selector-grid.component.html",
  styleUrls: ["./product-selector-grid.component.scss"],
})
export class ProductSelectorGridComponent implements OnInit {
  @Input() products: any[];
  defaultProductImage: any = "assets/svg/box-flat.svg";

  constructor(public productSelectorStore: ProductSelectorStore) {}

  ngOnInit() {}

  selectProduct(item) {
    this.productSelectorStore.selectProduct(item);
  }
}
