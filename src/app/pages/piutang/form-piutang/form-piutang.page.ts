import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PiutangService } from 'src/app/core/services/piutang.service';
import { Pipe } from 'src/app/core/helper/pipe';

@Component({
  selector: 'app-form-piutang',
  templateUrl: './form-piutang.page.html',
  styleUrls: ['./form-piutang.page.scss'],
})
export class FormPiutangPage implements OnInit {

  piutang: any = {};
  constructor(
    private activatedRoute: ActivatedRoute,
    private piutangService: PiutangService,
    private pipe: Pipe
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params && params.piutang) {
        this.piutang = params.piutang;
      }
    })
  }

  save() {
    this.piutangService.save(this.piutang).toPromise().then((res) => {
      this.pipe.alert('Success', 'Data berhasil disimpan').then((_) => {
        this.pipe.back('/piutang');
      })
    });
  }

  updateSisa() {
    this.piutang.sisa = (this.piutang.jumlah_hutang * 1) - (this.piutang.jumlah_bayar * 1);
  }

}
