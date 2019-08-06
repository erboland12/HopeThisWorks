import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  updated: boolean;
  isUpdating: boolean;

  updateForm: FormGroup;

  private username;
  private firstName;
  private lastName;
  private age;
  private location;
  private bio;

  constructor(private auth: AuthService,
              private fb: FormBuilder,
              private navCtrl: NavController,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    this.updated = true;

    this.updateForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      username: ['', Validators.required],
      age: [''],
      location: [''],
      bio: ['']
    });
  }

  get f() { return this.updateForm.controls; }



  edit(){
    this.updated = false;
  }

  submitInfo(){
    this.updated = true;

    if (this.updateForm.valid){
      this.auth.updateUser(this.username, this.firstName, this.lastName,
                           this.age, this.location, this.bio);
      let alert = this.alertCtrl.create({
        subHeader: 'Info Updated Successfully',
        message: 'Your Updated Information Will Display on Your Profile Page',
        buttons: ['OK']
      }).then(alert => alert.present());
      this.navCtrl.navigateBack('profile');
      this.auth.logged = true;
    } else{
      let alert = this.alertCtrl.create({
        subHeader: 'Process Failed',
        message: 'You Must Update all of the Fields',
        buttons: ['OK']
      }).then(alert => alert.present());
      return;    
    }
  }

}
