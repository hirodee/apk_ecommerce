import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-aktivitas-detail',
  templateUrl: './aktivitas-detail.page.html',
  styleUrls: ['./aktivitas-detail.page.scss'],
})
export class AktivitasDetailPage implements OnInit {
  subscribedData: any;
  dataAktivitas: any;

  constructor(
    private route:ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params)=>{
      if(params && params.data){
        this.dataAktivitas = params.data;
      }
    })
  }

  ionViewDidLeave()
  {
  }

}
