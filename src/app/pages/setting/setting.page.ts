import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/core/services/state.service';
import { SettingService } from 'src/app/core/services/setting.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor(
    public state: StateService,
    private setting: SettingService
  ) { }

  ngOnInit() {
  }

  setPrintOption(value) {
    this.state.setState({ key: "print_nota", value: this.state.users.print_nota });
    console.log(this.state.users);
  }

  setPrintFormat(format) {
    this.setting.setPrinterFormat(format).toPromise().then((data) => {
      this.state.setState({ key: "print_format", value: format }).then((_) => {
        console.log(this.state.users)
      })
    });
  }

  setReturUpdateStok() {
    this.setting.setReturUpdateStok({ 'update_stok': this.state.users.update_stok_on_retur, 'jenis': 'jual' }).subscribe((res) => {
      this.state.setState({ key: "update_stok_on_retur", value: this.state.users.update_stok_on_retur }).then((_) => {
        console.log(this.state.users)
      })
    })
  }

}
