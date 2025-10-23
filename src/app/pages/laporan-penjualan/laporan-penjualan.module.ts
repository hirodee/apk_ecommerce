import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LaporanPenjualanPage } from './laporan-penjualan.page';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PipesModule } from 'src/app/core/pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: LaporanPenjualanPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgApexchartsModule,
    PipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LaporanPenjualanPage]
})
export class LaporanPenjualanPageModule { }
