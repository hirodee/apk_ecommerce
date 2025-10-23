import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FormPiutangPage } from './form-piutang.page';
import { PipesModule } from 'src/app/core/pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: FormPiutangPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FormPiutangPage]
})
export class FormPiutangPageModule { }
