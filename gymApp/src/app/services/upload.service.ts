import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Upload } from '../upload/upload';
import * as firebase from 'firebase/app';
import { AngularFireModule } from 'angularfire2';

@Injectable()
export class UploadService {

  imageDetailList: AngularFireList<any>;

  constructor(private fb: AngularFireDatabase) { }

  getImageDetailList(){
    this.imageDetailList = this.fb.list('imageDetails');
  }

  insertImageDetails(imageDetails){
    this.imageDetailList.push(imageDetails);
  }

}