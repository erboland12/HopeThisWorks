import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface HighScore
{
  username: string;

  highScoreSubEasy: number;
  highScoreSubIntermediate: number;
  highScoreSubHard: number;
  highScoreSubWizard: number;

  highScoreAddEasy: number;
  highScoreAddIntermediate: number;
  highScoreAddHard: number;
  highScoreAddWizard: number;

  highScoreMultEasy: number;
  highScoreMultIntermediate: number;
  highScoreMultHard: number;
  highScoreMultWizard: number;

  highScoreDivEasy: number;
  highScoreDivIntermediate: number;
  highScoreDivHard: number;
  highScoreDivWizard: number;
} 

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
})

export class LeaderboardPage implements OnInit {
  mode = ''; 
  difficulty = '';

  //reference for each high score category
  userRef: AngularFirestoreCollection<HighScore>;
  userRef2: AngularFirestoreCollection<HighScore>;
  userRef3: AngularFirestoreCollection<HighScore>;
  userRef4: AngularFirestoreCollection<HighScore>;
  userRef5: AngularFirestoreCollection<HighScore>;
  userRef6: AngularFirestoreCollection<HighScore>;
  userRef7: AngularFirestoreCollection<HighScore>;
  userRef8: AngularFirestoreCollection<HighScore>;
  userRef9: AngularFirestoreCollection<HighScore>;
  userRef10: AngularFirestoreCollection<HighScore>;
  userRef11: AngularFirestoreCollection<HighScore>;
  userRef12: AngularFirestoreCollection<HighScore>;
  userRef13: AngularFirestoreCollection<HighScore>;
  userRef14: AngularFirestoreCollection<HighScore>;
  userRef15: AngularFirestoreCollection<HighScore>;
  userRef16: AngularFirestoreCollection<HighScore>;

  //Separate obser. arrays for ordering high scores
  user$: Observable<HighScore[]>;
  user$2: Observable<HighScore[]>;
  user$3: Observable<HighScore[]>;
  user$4: Observable<HighScore[]>;
  user$5: Observable<HighScore[]>;
  user$6: Observable<HighScore[]>;
  user$7: Observable<HighScore[]>;
  user$8: Observable<HighScore[]>;
  user$9: Observable<HighScore[]>;
  user$10: Observable<HighScore[]>;
  user$11: Observable<HighScore[]>;
  user$12: Observable<HighScore[]>;
  user$13: Observable<HighScore[]>;
  user$14: Observable<HighScore[]>;
  user$15: Observable<HighScore[]>;
  user$16: Observable<HighScore[]>;

  constructor(private afs: AngularFirestore) 
  { 
    this.userRef = this.afs.collection('users', ref =>{
      return ref.orderBy('highScoreSubEasy','desc');
    });
    this.user$ = this.userRef.valueChanges();

    this.userRef2 = this.afs.collection('users', ref =>{
      return ref.orderBy('highScoreAddEasy','desc');
    });
    this.user$2 = this.userRef2.valueChanges();

    this.userRef3 = this.afs.collection('users', ref =>{
      return ref.orderBy('highScoreMultEasy','desc');
    });
    this.user$3 = this.userRef3.valueChanges();

    this.userRef4 = this.afs.collection('users', ref =>{
      return ref.orderBy('highScoreDivEasy','desc');
    });
    this.user$4 = this.userRef4.valueChanges();

    this.userRef5 = this.afs.collection('users', ref =>{
      return ref.orderBy('highScoreSubIntermediate','desc');
    });
    this.user$5 = this.userRef5.valueChanges();

    this.userRef6 = this.afs.collection('users', ref =>{
      return ref.orderBy('highScoreAddIntermediate','desc');
    });
    this.user$6 = this.userRef6.valueChanges();

    this.userRef7 = this.afs.collection('users', ref =>{
      return ref.orderBy('highScoreMultIntermediate','desc');
    });
    this.user$7 = this.userRef7.valueChanges();

    this.userRef8 = this.afs.collection('users', ref =>{
      return ref.orderBy('highScoreDivIntermediate','desc');
    });
    this.user$8 = this.userRef8.valueChanges();

    this.userRef9 = this.afs.collection('users', ref =>{
      return ref.orderBy('highScoreSubHard','desc');
    });
    this.user$9 = this.userRef9.valueChanges();

    this.userRef10 = this.afs.collection('users', ref =>{
      return ref.orderBy('highScoreAddHard','desc');
    });
    this.user$10 = this.userRef10.valueChanges();

    this.userRef11 = this.afs.collection('users', ref =>{
      return ref.orderBy('highScoreMultHard','desc');
    });
    this.user$11 = this.userRef11.valueChanges();

    this.userRef12 = this.afs.collection('users', ref =>{
      return ref.orderBy('highScoreDivHard','desc');
    });
    this.user$12 = this.userRef12.valueChanges();

    this.userRef13 = this.afs.collection('users', ref =>{
      return ref.orderBy('highScoreSubWizard','desc');
    });
    this.user$13 = this.userRef13.valueChanges();

    this.userRef14 = this.afs.collection('users', ref =>{
      return ref.orderBy('highScoreAddWizard','desc');
    });
    this.user$14 = this.userRef14.valueChanges();

    this.userRef15 = this.afs.collection('users', ref =>{
      return ref.orderBy('highScoreMultWizard','desc');
    });
    this.user$15 = this.userRef15.valueChanges();

    this.userRef16 = this.afs.collection('users', ref =>{
      return ref.orderBy('highScoreDivWizard','desc');
    });
    this.user$16 = this.userRef16.valueChanges();

  }

  ngOnInit() 
  {

  }

  displayBoard(mode: string, difficulty: string)
  {
    
  }

  checkLog()
  {
    console.log(this.mode);
    console.log(this.difficulty);
  }

}
