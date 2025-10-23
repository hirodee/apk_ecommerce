import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/core/services/state.service';
import { Pipe } from 'src/app/core/helper/pipe';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {

  constructor(
    public state: StateService,
    private pipe: Pipe
  ) { }

  ngOnInit() { }

  save() {
    this.state.setUrl().then((res) => {
      this.pipe.alert("Success", "Berhasil disimpan").then(() => {
        this.pipe.root('/home')
      });
    }).catch((err) => {
      this.pipe.alert("Gagal", "Gagal disimpan");
    });
  }

}
