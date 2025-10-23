import { Component, OnInit } from '@angular/core';
import { Pipe } from '../../core/helper/pipe';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(
    private pipe: Pipe
  ) { }

  ngOnInit() {
  }

  openLink(router) {
    this.pipe.next(router);
  }

}
