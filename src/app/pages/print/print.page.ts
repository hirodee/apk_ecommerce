import { Component, OnInit } from '@angular/core';
import { Printer } from '@ionic-native/printer/ngx';
import { OrderService } from 'src/app/core/services/order.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Pipe } from '../../core/helper/pipe';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';

@Component({
  selector: 'app-print',
  templateUrl: './print.page.html',
  styleUrls: ['./print.page.scss'],
})
export class PrintPage implements OnInit {

  printPage: any = "";
  constructor(
    private print: Printer,
    private orderService: OrderService,
    private sanitizer: DomSanitizer,
    private pipe: Pipe,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private pdfGenerator: PDFGenerator
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params && params.id) {
        this.orderService.printNota(params.id).subscribe((res) => {
          let options = {
            documentSize: 'A4',
            type: 'share'
          }
       
          this.pdfGenerator.fromData(res.data, options).
            then(resolve => {
              console.log(resolve);
       
            }
            ).catch((err) => {
              console.error(err);
            });
            
          this.printPage = this.transformYourHtml(res.data);
          setTimeout(() => {
            this.print.print().then((_) => {
              this.navCtrl.back();
            });
          }, 500);
        })
      }
    })

  }

  transformYourHtml(htmlTextWithStyle) {
    return this.sanitizer.bypassSecurityTrustHtml(htmlTextWithStyle);
  }

}
