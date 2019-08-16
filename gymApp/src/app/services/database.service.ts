import { Injectable } from '@angular/core';
import * as PouchDB from 'pouchdb/dist/pouchdb';


@Injectable({
  providedIn: 'root'
})

export class User{
  firstName?: string ='';
  lastName?: string ='';
  username: string ='';
  email: string = '';
  password?: string ='';
  bio?: string='';
}
export class DatabaseService {
  public db = new PouchDB('users');
  constructor() { }

}
