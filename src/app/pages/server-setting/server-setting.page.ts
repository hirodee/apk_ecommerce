import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-server-setting',
  templateUrl: './server-setting.page.html',
  styleUrls: ['./server-setting.page.scss'],
})
export class ServerSettingPage implements OnInit {
  postInstallation: any = false;
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params && params.postInstallation) {
        this.postInstallation = true;
      }
    })
  }


}
