import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { UploadService } from '../services/upload.service';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import * as _ from "lodash";
import { Observable } from 'rxjs';
import { inspectNativeElement } from '@angular/platform-browser/src/dom/debug/ng_probe';
import { finalize } from 'rxjs/operators';
import { StatsService } from '../stats/stats.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  updated: boolean;
  isUpdating: boolean;

  updateForm: FormGroup;

  nameEdit: boolean;
  ageEdit: boolean;
  backEdit: boolean;
  locationEdit: boolean;
  bioEdit: boolean;
  usernameEdit: boolean;
  photoEdit: boolean;

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;

  profileURL : Observable<string | null>

  isHovering: boolean;

  private username;
  private firstName;
  private lastName;
  private age;
  private location;
  private bio;
  private color;
  private photoURL;

  private imgSrc: string = this.auth.photoURL;
  private selectedImg: any = null;

  private statistics: any[] = [
    "Hello", "World"
  ];

  constructor(private auth: AuthService,
              private fb: FormBuilder,
              private navCtrl: NavController,
              private alertCtrl: AlertController,
              private stats: StatsService,
              private storage: AngularFireStorage,
              private upSvc: UploadService) 
  { 
    const ref = this.storage.ref(``)
  }

  ngOnInit() {
    this.updated = true;

    this.updateForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      username: ['', Validators.required],
      age: [''],
      location: [''],
      bio: [''],
      color: [''],
      photoURL: ['']
    });

    this.upSvc.getImageDetailList();
    this.stats.testing();

    this.checkForColors();
  }

  get f() { return this.updateForm.controls; }



  edit(){
    this.updated = false;
  }

  finish(){
    this.updated = true;
  }

  submitInfo(){
    this.updated = true;

    if (this.updateForm.valid){
      var filePath = `profilePics/${this.selectedImg.name.split('.').slice(0,-1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImg).snapshotChanges().pipe(
        finalize(() =>{
          fileRef.getDownloadURL().subscribe((url) =>{
            if(url){
              this.photoURL = url;
              this.auth.updateProfileURL(this.photoURL);
              console.log(this.photoURL);
              console.log(url);
              this.upSvc.insertImageDetails(url);
            }
          })
        })
      ).subscribe();
      this.auth.updateUser(this.username, this.firstName, this.lastName,
                           this.age, this.location, this.bio, this.color);

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
        message: 'First Name and Display Name Required',
        buttons: ['OK']
      }).then(alert => alert.present());
      return;    
    }
  }


  showPicture(event: any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e:any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImg = event.target.files[0];
    }
    else{
      this.imgSrc = '../assets/icon/profilePH.png';
      this.selectedImg = null;
    }
  }

  checkForColors(){
    if(this.auth.highScoreAddEasy >= 10){
      this.auth.red = false;
    } else{
      this.auth.red = true;
    }
    if(this.auth.highScoreMultEasy >= 10){
      this.auth.orange = false;
    } else{
      this.auth.orange = true;
    }
    if(this.auth.highScoreSubEasy >= 10){
      this.auth.blue = false;
    } else{
      this.auth.blue = true;
    }
    if(this.auth.highScoreDivEasy >= 10){
      this.auth.green = false;
    } else{
      this.auth.green = true;
    }

    if(this.auth.highScoreAddHard >= 10){
      this.auth.crimson = false;
    } else{
      this.auth.crimson = true;
    }
    if(this.auth.highScoreMultHard >= 10){
      this.auth.neonOrange = false;
    } else{
      this.auth.neonOrange = true;
    }
    if(this.auth.highScoreSubHard >= 10){
      this.auth.neonBlue = false;
    } else{
      this.auth.neonBlue = true;
    }
    if(this.auth.highScoreDivHard >= 10){
      this.auth.limeGreen = false;
    } else{
      this.auth.limeGreen = true;
    }

  }

  cancel(){
    this.nameEdit = false;
    this.photoEdit = false;
    this.bioEdit = false;
    this.ageEdit = false;
    this.locationEdit = false;
    this.backEdit = false;
    this.usernameEdit = false;
  }

  editName(){
    this.nameEdit = true;
    this.photoEdit = false;
    this.bioEdit = false;
    this.ageEdit = false;
    this.locationEdit = false;
    this.backEdit = false;
    this.usernameEdit = false;
  }

  editAge(){
    this.ageEdit = true;
    this.nameEdit = false;
    this.photoEdit = false;
    this.bioEdit = false;
    this.locationEdit = false;
    this.backEdit = false;
    this.usernameEdit = false;
  }

  editLocation(){
    this.ageEdit = false;
    this.nameEdit = false;
    this.photoEdit = false;
    this.bioEdit = false;
    this.locationEdit = true;
    this.backEdit = false;
    this.usernameEdit = false;
  }

  editBio(){
    this.ageEdit = false;
    this.nameEdit = false;
    this.photoEdit = false;
    this.bioEdit = true;
    this.locationEdit = false;
    this.backEdit = false;
    this.usernameEdit = false;
  }

  editUsername(){
    this.ageEdit = false;
    this.nameEdit = false;
    this.photoEdit = false;
    this.bioEdit = false;
    this.locationEdit = false;
    this.backEdit = false;
    this.usernameEdit = true;
  }

  editBack(){
    this.ageEdit = false;
    this.nameEdit = false;
    this.photoEdit = false;
    this.bioEdit = false;
    this.locationEdit = false;
    this.backEdit = true;
    this.usernameEdit = false;
  }

  editPhoto(){
    this.ageEdit = false;
    this.nameEdit = false;
    this.photoEdit = true;
    this.bioEdit = false;
    this.locationEdit = false;
    this.backEdit = false;
    this.usernameEdit = false;
  }

  updateInfoName(fname:string, lname?:string){
    if(lname != '' && fname != ''){
      this.auth.updateUser(this.auth.uname, fname, lname);
    } else if (lname == '' && fname != ''){
      this.auth.updateUser(this.auth.uname, this.auth.fname, '');
    }

    this.nameEdit = false;
  }

  updateAge(age: number){
    if(age != null){
      this.auth.updateUser(this.auth.uname, this.auth.fname, this.auth.lname, age);
    }

    this.ageEdit = false;
  }

  updateLocation(location: string){
    if(location != null){
      this.auth.updateUser(this.auth.uname, this.auth.fname, this.auth.lname,
                           this.auth.age, location);
    }
    this.locationEdit = false;
  }

  updateBio(bio: string){
    if(bio != null){
      this.auth.updateUser(this.auth.uname, this.auth.fname, this.auth.lname,
        this.auth.age, this.auth.location, bio);
    }
    this.bioEdit = false;
  }

  updateUsername(uname: string){
    if(uname != null){
      this.auth.updateUser(uname, this.auth.fname);
    }
    this.usernameEdit = false;
  }

  updateBack(color: string){
    if(color != null){
      this.auth.updateUser(this.auth.uname, this.auth.fname, this.auth.lname,
        this.auth.age, this.auth.location, this.auth.bio,color);
    }
    this.backEdit = false;
  }

  updatePhoto(){
    this.photoEdit = false;
    var filePath = `profilePics/${this.selectedImg.name.split('.').slice(0,-1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImg).snapshotChanges().pipe(
        finalize(() =>{
          fileRef.getDownloadURL().subscribe((url) =>{
            if(url){
              this.photoURL = url;
              this.auth.updateProfileURL(this.photoURL);
              console.log(this.photoURL);
              console.log(url);
              this.upSvc.insertImageDetails(url);
            }
          })
        })
      ).subscribe();

  }

  


}
