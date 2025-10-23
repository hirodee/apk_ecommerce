import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AktivitasDetailPage } from './aktivitas-detail.page';

const routes: Routes = [
  {
    path: '',
    component: AktivitasDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AktivitasDetailPage]
})
export class AktivitasDetailPageModule {}
