import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TitleComponent } from './title/title.component';
import { PipesModule } from '../core/pipes/pipes.module';
import { FilePickerComponent } from './file-picker/file-picker.component';

const COMPONENT = [
    TitleComponent,
    FilePickerComponent
]

@NgModule({
    imports: [
        IonicModule.forRoot(),
        CommonModule,
        FormsModule,
        PipesModule,
        RouterModule,
    ],
    declarations: [
        COMPONENT
    ],
    exports: [
        COMPONENT
    ],
})
export class ComponentsModule { }