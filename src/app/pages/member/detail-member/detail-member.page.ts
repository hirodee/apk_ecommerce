import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Pipe } from 'src/app/core/helper/pipe';
import { MemberService } from 'src/app/core/services/member.service';

@Component({
  selector: 'app-detail-member',
  templateUrl: './detail-member.page.html',
  styleUrls: ['./detail-member.page.scss'],
})
export class DetailMemberPage implements OnInit {

  detailMember: any = {};
  constructor(
    private route: ActivatedRoute,
    private pipe: Pipe,
    private memberService: MemberService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params && params.detail) {
        this.detailMember = params.detail;
      }
    })
  }

  updateMember() {
    let navExtras: NavigationExtras = {
      queryParams: {
        member: this.detailMember
      }
    }

    this.pipe.navigate("/form-member", navExtras)
  }

  deleteMember() {
    this.memberService.delete({ id_member: this.detailMember.id_member }).toPromise().then((data) => {
      let navExtras: NavigationExtras = {
        queryParams: {
          deleteItem: data.data
        }
      }
      this.pipe.navigate('/member', navExtras);
    });
  }

}
