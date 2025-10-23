import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivityService } from 'src/app/core/services/activity.service';

@Component({
  selector: 'app-hall',
  templateUrl: './hall.page.html',
  styleUrls: ['./hall.page.scss'],
})
export class HallPage implements OnInit {

  bestCS:any = [{url_profile:"",nama_cs:"",closing:0}];
  otherCS:any = [];
  constructor(
    private activity:ActivityService
  ) { }

  ngOnInit() {
    this.activity.getPeringkat(false).subscribe(res=>{
      this.bestCS = res.data;
    });
  }

}
