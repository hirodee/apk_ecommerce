import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export enum DisplayType {
  Grid,
  List,
}

@Injectable({
  providedIn: "root",
})
export class ProductSelectorStore {
  products: any = [];
  selectedCategory: any;
  displayType: DisplayType = DisplayType.List;
  selectedProduct: any = {};

  closeModal = new BehaviorSubject(false);

  selectProduct(item) {
    this.selectedProduct = item;
    this.closeModal.next(true);
  }
}
