import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-retur',
  templateUrl: './retur.page.html',
  styleUrls: ['./retur.page.scss'],
})
export class ReturPage implements OnInit {

  state: any = 'manual';
  constructor() { }
  ngOnInit() {
  }

  segmentChanged(event) {
    this.state = event;
  }

}
