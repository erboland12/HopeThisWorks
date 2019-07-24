import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';

@Injectable()
export class UserService{
    getUsers(){
        return USER;
    }

    getUser(displayName: string):IUser{
        return USER.find(user => user.displayName === displayName);
    }
}

const USER:IUser[] = [
    {
        firstName: "Eric",
        lastName: "Boland",
        displayName: "Rockkkkkkkky",
        email: 'test@test.com',
        password: 'word'
    }

]


