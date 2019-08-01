import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import * as PouchDB from 'pouchdb/dist/pouchdb';
import { DatabaseService, User } from '../services/database.service';
import { Storage } from '@ionic/storage';
import { AuthService } from '../services/auth.service';
import { MustMatch } from '../models/mustMatch';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  invalid: boolean;
  submitted = false;

  regForm: FormGroup;

  private username;
  private firstName;
  private lastName;
  private email; 
  private password;

  private newUser: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }

  constructor(public navCtrl: NavController,
              private data: DatabaseService,
              private storage: Storage,
              private fb: FormBuilder,
              private auth: AuthService,
              private alertCtrl: AlertController) { }


  ngOnInit() {
    this.regForm = this.fb.group({
      email:['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required]
    }, {
      validators: MustMatch('password', 'confirmPassword')
    });
  }

  mustMatch(password, confirmPassword){

  }

  get f() { return this.regForm.controls; }

  signUp(){
    this.submitted = true;
    if (this.regForm.valid){
      this.auth.registerUser(this.email, this.password);
      let alert = this.alertCtrl.create({
        message: 'Login Successful',
        buttons: ['OK']
      }).then(alert => alert.present());
      this.navCtrl.navigateForward('login');
    } else{
      let alert = this.alertCtrl.create({
        subHeader: 'Registration Failed',
        message: 'Go Back and Complete all Required Fields',
        buttons: ['OK']
      }).then(alert => alert.present());
      return;
    }
    console.warn(this.regForm.value);
  }

}
