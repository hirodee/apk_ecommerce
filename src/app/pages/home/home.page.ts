import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/core/services/state.service';
import { Pipe } from 'src/app/core/helper/pipe';
import { Database } from 'src/app/core/helper/db';
import { AuthService } from 'src/app/core/services/auth.service';
import { Platform } from '@ionic/angular';
import { ScrollDetail } from '@ionic/core';
import { OrderService } from 'src/app/core/services/order.service';
import { ActivityService } from 'src/app/core/services/activity.service';
import { NavigationExtras } from '@angular/router';
import { combineLatest } from 'rxjs';
import { SummaryService } from 'src/app/core/services/summary.service';
import { MenuService } from 'src/app/core/services/menu.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  subscription: any = [];
  showToolbar: boolean;
  listOrder: any = [];
  listAktivitas: any = [];
  bestCS: any = [];
  isIOS: boolean = false;
  usersDefaultProfile: any = 'assets/svg/users.svg';
  currDate = new Date().toJSON().slice(0, 10);
  queryParams: any = {
    dari: this.currDate,
    sampai: this.currDate,
    query: ''
  }
  summary: any = {};
  menu: any;

  constructor(
    private platform: Platform,
    public state: StateService,
    private pipe: Pipe,
    private db: Database,
    public auth: AuthService,
    private orderService: OrderService,
    private summaryService: SummaryService,
    private menuService: MenuService
  ) {
  }

  ngOnInit() {
    console.log('home:14', this.state.users);

    if (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone') || this.platform.is('mobile')) {
      this.isIOS = true;
    }
  }

  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 45;
    }
    console.log(this.showToolbar);
  }

  openDetail(id:any) {
    let navExtras: NavigationExtras = {
      queryParams: {
        id: id
      }
    }
    this.pipe.navigate('order-detail', navExtras)
  }

  openActivity(data:any) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        data: data
      }
    }
    this.pipe.navigate('aktivitas-detail', navigationExtras);
  }

  ionViewWillEnter() {
    this.menu = this.menuService.switchMenuByRole(typeof (this.state.users.level) !== "undefined" ? this.state.users.level : 1);
    
    let order = this.orderService.getHistoryOrder(this.queryParams);
    let summary = this.summaryService.getSummary();
    // let activity = this.activityService.getRiwayat();
    // let peringkat = this.activityService.getPeringkat(true);

    let subscription = combineLatest([order, summary]);

    this.subscription = subscription.subscribe(([order, summary]) => {
      this.listOrder = order.data;
      this.summary = summary.data;
    });

    // this.subscription["listOrder"] = this.orderService.getOrderHariIni().subscribe((res:any)=>{
    //   this.listOrder = res.data;
    // });
    // this.subscription["listAktivitas"] = this.activityService.getRiwayat().subscribe((res:any)=>{
    //   this.listAktivitas = res.data;
    // });
  }

  ionViewWillLeave() {
    // for(let item in this.subscription){
    //   this.subscription[item].unsubscribe();
    // }
  }

  openLink(router:any) {
    this.pipe.next(router);
  }

  openHall() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        data: this.bestCS
      }
    }
    this.pipe.navigate('/hall', navigationExtras);
  }

}
