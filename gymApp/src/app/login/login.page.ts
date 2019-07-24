import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { unwrapResolvedMetadata } from '@angular/compiler';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string;
  password: string;
  loginForm: FormGroup;
  constructor(private auth: AuthService,
              private navCtrl: NavController) { }

  ngOnInit() {
    let username = new FormControl();
    let password = new FormControl();
    this.loginForm = new FormGroup({
      username: username,
      password: password
    })
    this.loginForm.controls.username.invalid
  }

  login(){
    this.auth.loginUser(this.username, this.password);
    this.navCtrl.navigateForward('home');
    console.log(this.username);
    console.log(this.password);
    console.log(this.loginForm.controls.username.invalid);

  }

}
