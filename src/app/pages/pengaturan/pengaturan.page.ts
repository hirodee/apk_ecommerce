import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { StateService } from 'src/app/core/services/state.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-pengaturan',
  templateUrl: './pengaturan.page.html',
  styleUrls: ['./pengaturan.page.scss'],
})
export class PengaturanPage implements OnInit {
  
  constructor(
    public auth:AuthService,
    public state:StateService,
  ) { }

  ngOnInit() {
    
  }

}
