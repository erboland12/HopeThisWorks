import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  constructor() { }

  ngOnInit() {
    let username = new FormControl();
    let password = new FormControl();
    this.loginForm = new FormGroup({
      username: username,
      password: password
    })
  }

}
