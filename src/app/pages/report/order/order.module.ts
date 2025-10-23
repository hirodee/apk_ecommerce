import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { OrderPage } from "./order.page";
import { PipesModule } from "src/app/core/pipes/pipes.module";
import { NgSelect2Module } from "ng-select2";
import { ProductSelectorComponent } from "./components/product-selector/product-selector.component";
import { ProductSelectorGridComponent } from "./components/product-selector-grid/product-selector-grid.component";
import { ProductSelectorListComponent } from "./components/product-selector-list/product-selector-list.component";
import { CategorySelectorComponent } from "./components/category-selector/category-selector.component";

const routes: Routes = [
  {
    path: "",
    component: OrderPage,
  },
];

const COMPONENTS = [
  ProductSelectorComponent,
  ProductSelectorGridComponent,
  ProductSelectorListComponent,
  CategorySelectorComponent,
];

@NgModule({
  declarations: [OrderPage, ...COMPONENTS],
  entryComponents: [...COMPONENTS],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelect2Module,
    IonicModule,
    PipesModule,
    RouterModule.forChild(routes),
  ],
})
export class OrderPageModule {}
