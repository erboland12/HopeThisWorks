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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  updated: boolean;
  isUpdating: boolean;

  updateForm: FormGroup;

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

  constructor(private auth: AuthService,
              private fb: FormBuilder,
              private navCtrl: NavController,
              private alertCtrl: AlertController,
              private http: HttpClient,
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
  }

  get f() { return this.updateForm.controls; }



  edit(){
    this.updated = false;
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
  


}
