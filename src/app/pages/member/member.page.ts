import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/core/services/member.service';
import { NavigationExtras, ActivatedRoute } from '@angular/router';
import { Pipe } from '../../core/helper/pipe';

@Component({
  selector: 'app-member',
  templateUrl: './member.page.html',
  styleUrls: ['./member.page.scss'],
})
export class MemberPage implements OnInit {

  dataMember: any = [];
  showProgressBar: boolean = true;
  constructor(
    private member: MemberService,
    private pipe: Pipe,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params && params.deleteItem) {
        this.dataMember = this.dataMember.filter((item) => item.id_member !== params.deleteItem);
      }
    })
    this.showProgressBar = true;
    this.member.getData({ query: '' }).subscribe((res) => {
      this.dataMember = res.data;
      this.showProgressBar = false;
    });
  }

  openDetail(item) {
    let navExtras: NavigationExtras = {
      queryParams: {
        detail: item
      }
    }
    this.pipe.navigate('/detail-member', navExtras)
  }

  onSearch(query) {
    this.showProgressBar = true;
    this.member.getData({ query: query }).subscribe((res) => {
      this.dataMember = res.data;
      this.showProgressBar = false;
    });
  }

}
