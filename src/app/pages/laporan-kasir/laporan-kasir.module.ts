import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LaporanKasirPage } from './laporan-kasir.page';

const routes: Routes = [
  {
    path: '',
    component: LaporanKasirPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LaporanKasirPage]
})
export class LaporanKasirPageModule {}
