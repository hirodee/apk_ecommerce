import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetailSatuanProdukPage } from './detail-satuan-produk.page';

const routes: Routes = [
  {
    path: '',
    component: DetailSatuanProdukPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetailSatuanProdukPage]
})
export class DetailSatuanProdukPageModule {}
