import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { AngularFireAuth } from 'angularfire2/auth';
import { IUser } from '../models/user.model';

@Injectable()
export class UserService{
    users: AngularFireList<IUser[]> = null;
    userId: string;

    constructor(private db: AngularFireDatabase, 
                private afAuth: AngularFireAuth){
        this.afAuth.authState.subscribe(user => {
            if(user){
                this.userId = user.uid
            }
        })
    }

    getUsersList(): AngularFireList<IUser[]> {
        if(!this.userId) {
            return;
        }
        this.users = this.db.list(`users/${this.userId}`);
        return this.users;
    }

}



