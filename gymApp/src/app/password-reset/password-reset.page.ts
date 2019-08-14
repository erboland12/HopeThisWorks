import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {
  emailSent: boolean;
  constructor(private auth: AuthService,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    console.log(this.auth.afAuth.auth.currentUser);
  }

  emailSubmit(email: string){
    this.auth.emailSubmit(email).then(() =>{
      this.emailSent = true;
    });
  }

  // resetPassword(email: string) { 
  //   if (!email) { 
  //     let alert = this.alertCtrl.create({
  //       subHeader: 'Invalid Email Address',
  //       message: 'Please Enter a Valid Email, or Register an Account if you Have not Already',
  //       buttons: ['OK']
  //     }).then(alert => alert.present()); 
  //   } else{
  //     this.auth.emailSent = true;
  //     this.auth.resetPassword(email) 
  //     let alert = this.alertCtrl.create({
  //       subHeader: 'Success!',
  //       message: 'Please Check your Email for a Verification Link',
  //       buttons: ['OK']
  //     }).then(alert => alert.present()); 
  //     }
  //   }

    resetPassword(email: string) {
     this.auth.resetPassword(email)
    }

}
