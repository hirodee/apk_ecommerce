import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { take } from "rxjs/operators";
import { KategoriService } from "../../../../../core/services/kategori.service";
import { ProductSelectorStore } from "../product-selector-store.service";

@Component({
  selector: "app-category-selector",
  templateUrl: "./category-selector.component.html",
  styleUrls: ["./category-selector.component.scss"],
})
export class CategorySelectorComponent implements OnInit {
  categories = [];
  constructor(
    private modalCtrl: ModalController,
    private kategoriService: KategoriService,
    public productSelectorStore: ProductSelectorStore
  ) {}

  ngOnInit() {
    this.getCategory();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  getCategory() {
    this.kategoriService
      .getData({
        query: "",
      })
      .pipe(take(1))
      .subscribe((response) => {
        this.categories = response.data;
      });
  }

  selectCategory(item) {
    this.productSelectorStore.selectedCategory = item;
    this.modalCtrl.dismiss(item);
  }
}
