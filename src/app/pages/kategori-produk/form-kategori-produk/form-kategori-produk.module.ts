import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FormKategoriProdukPage } from './form-kategori-produk.page';

const routes: Routes = [
  {
    path: '',
    component: FormKategoriProdukPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FormKategoriProdukPage]
})
export class FormKategoriProdukPageModule {}
