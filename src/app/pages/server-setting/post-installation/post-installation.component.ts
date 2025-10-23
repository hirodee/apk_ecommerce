import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/core/services/state.service';
import { Pipe } from 'src/app/core/helper/pipe';

@Component({
  selector: 'app-post-installation',
  templateUrl: './post-installation.component.html',
  styleUrls: ['./post-installation.component.scss'],
})
export class PostInstallationComponent implements OnInit {

  constructor(
    public state: StateService,
    private pipe: Pipe
  ) { }

  ngOnInit() { }

  save() {
    this.state.setUrl().then((res) => {
      this.pipe.alert("Success", "Berhasil disimpan").then(() => {
        this.pipe.root('/login')
      });
    }).catch((err) => {
      this.pipe.alert("Gagal", "Gagal disimpan");
    });
  }
}
