import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Pipe } from 'src/app/core/helper/pipe';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {
  validatePassword:any;
  constructor(
    public formGroup:FormBuilder,
    public auth:AuthService,
    public pipe:Pipe
  ) { }

  ngOnInit() {
    this.validatePassword = this.formGroup.group({
      old:['',Validators.compose([Validators.required])],
      new:['',Validators.compose([Validators.required])],
      confirm_new:['',Validators.compose([Validators.required])],
    },{validator:this.checkPasswords})
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('new').value;
    let confirmPass = group.get('confirm_new').value;

    return pass === confirmPass ? null : { notSame: true }     
  }

  ubahPassword()
  {
    this.auth.changePassword(this.validatePassword.value).subscribe(res=>{
      this.pipe.alert("Info",res.message);
      this.pipe.next('/home');
    });
  }

}
