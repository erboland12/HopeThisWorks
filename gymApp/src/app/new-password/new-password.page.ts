import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../models/mustMatch';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.page.html',
  styleUrls: ['./new-password.page.scss'],
})
export class NewPasswordPage implements OnInit {
  submitted: boolean;
  passForm: FormGroup;
  private email; 
  private password;
  constructor(private fb: FormBuilder,
              private alertCtrl: AlertController,
              private auth: AuthService) { }

  ngOnInit() {
    console.log(this.auth.currentEmail);
    this.passForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: MustMatch('password', 'confirmPassword')
    });

  }

  get f(){ return this.passForm.controls}

  onSubmit(){
    this.submitted = true;
    if(this.passForm.valid){
      console.log("Worked");
      this.auth.updateNewPassword('erboland@uvm.edu', this.password);
      let alert = this.alertCtrl.create({
        subHeader: 'Success!',
        message: 'Your Password has been Updated',
        buttons: ['OK']
      }).then(alert => alert.present());
    }

    if(this.passForm.invalid){
      console.log('Error')
    }
  }

}
