import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { MemberService } from 'src/app/core/services/member.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-form-member',
  templateUrl: './form-member.page.html',
  styleUrls: ['./form-member.page.scss'],
})
export class FormMemberPage implements OnInit {

  member: any = {
    kode: ""
  };
  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params && params.member) {
        this.member = params.member
      } else {
        this.memberService.getKode().toPromise().then((res) => {
          this.member.kode = res.data;
        })
      }
    })
  }

  save() {
    this.memberService.save(this.member).toPromise().then((res) => {
      let navExtras: NavigationExtras = {
        queryParams: {
          detail: res.data
        }
      }
      this.navCtrl.navigateBack('/detail-member', navExtras)
    })
  }


}
