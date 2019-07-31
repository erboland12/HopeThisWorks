import { Injectable, OnInit } from '@angular/core';
import { IUser } from '../models/user.model';

@Injectable()
export class AuthService{
    currentUser: IUser;
    logged: boolean;
    
    constructor(){

    }

    loginUser(email: string, password: string){
        this.currentUser = {
            firstName: "Eric",
            lastName: "Boland",
            username: "Nogz",
            email: "erb@Test.com",
            password: "istyv123"
        }
    }

    isAuthenticated(){
        return !!this.currentUser;
    }

    isLoggedIn(){
        return !!this.logged
    }
}