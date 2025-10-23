import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FormSatuanProdukPage } from './form-satuan-produk.page';

const routes: Routes = [
  {
    path: '',
    component: FormSatuanProdukPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FormSatuanProdukPage]
})
export class FormSatuanProdukPageModule {}
