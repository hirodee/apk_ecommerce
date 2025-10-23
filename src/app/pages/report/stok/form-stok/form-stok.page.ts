import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StokService } from 'src/app/core/services/stok.service';
import { Pipe } from 'src/app/core/helper/pipe';

@Component({
  selector: 'app-form-stok',
  templateUrl: './form-stok.page.html',
  styleUrls: ['./form-stok.page.scss'],
})
export class FormStokPage implements OnInit {

  stok: any = {};
  constructor(
    private route: ActivatedRoute,
    private stokService: StokService,
    private pipe: Pipe
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params && params.stok) {
        this.stok = params.stok;
      }
    })
  }

  save() {
    this.stokService.save(this.stok).toPromise().then((data) => {
      this.pipe.alert('Success', 'Stok berhasil diupdate')
    }).catch((err) => {
      this.pipe.alert('Gagal', `Stok gagal di update reason: ${JSON.stringify(err)}`);
    });
  }

}
