import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetailKategoriProdukPage } from './detail-kategori-produk.page';

const routes: Routes = [
  {
    path: '',
    component: DetailKategoriProdukPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetailKategoriProdukPage]
})
export class DetailKategoriProdukPageModule {}
