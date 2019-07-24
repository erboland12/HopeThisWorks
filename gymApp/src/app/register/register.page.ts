import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  invalid: boolean;

  regForm: FormGroup;
  constructor(public navCtrl: NavController) { }

  ngOnInit() {
    let username = new FormControl("", Validators.required);
    let password = new FormControl("", Validators.required);
    let firstName = new FormControl("", Validators.required);
    let lastName = new FormControl("", Validators.required);
    let email = new FormControl("", Validators.required);
    let location = new FormControl("", Validators.required);

    this.regForm = new FormGroup({
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      // email: email,
      // location: location
    })
  }

  signUp(){
    if (this.regForm.valid){
      this.navCtrl.navigateForward('login');
    } else{
      this.invalid = true;
    }
  }

}
