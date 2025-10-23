import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReturPage } from './retur.page';
import { FakturComponent } from './faktur/faktur.component';
import { ManualComponent } from './manual/manual.component';
import { PipesModule } from 'src/app/core/pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: ReturPage
  }
];

const COMPONENT = [
  FakturComponent,
  ManualComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: COMPONENT,
  declarations: [ReturPage, COMPONENT]
})
export class ReturPageModule { }
