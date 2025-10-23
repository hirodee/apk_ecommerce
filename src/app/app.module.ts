import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { FormBuilder } from '@angular/forms';
import { FilePath } from '@ionic-native/file-path/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { NgSelect2Module } from 'ng-select2';
import { Printer } from '@ionic-native/printer/ngx';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { PrinterProvider } from 'src/providers/print/print';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    NgSelect2Module,
    NgApexchartsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FormBuilder,
    Camera,
    File,
    WebView,
    FilePath,
    Clipboard,
    Printer,
    BarcodeScanner,
    PrinterProvider,
    BluetoothSerial,
    PDFGenerator,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
