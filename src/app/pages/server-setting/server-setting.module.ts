import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ServerSettingPage } from './server-setting.page';
import { PostInstallationComponent } from './post-installation/post-installation.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {
    path: '',
    component: ServerSettingPage
  }
];

const COMPONENT = [
  PostInstallationComponent,
  UpdateComponent
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  exports: [COMPONENT],
  declarations: [ServerSettingPage, COMPONENT]
})
export class ServerSettingPageModule { }
