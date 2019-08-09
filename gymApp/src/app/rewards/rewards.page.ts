import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.page.html',
  styleUrls: ['./rewards.page.scss'],
})
export class RewardsPage implements OnInit {
  logged: boolean = false;
  constructor(private auth: AuthService) { }

  public rewards = [
    {
      name: 'Red Background',
      desc: 'Get a Score of at Least 10 on Addition Easy Mode',
      color: 'Red',
      locked: this.auth.highScoreAddEasy < 10
    },
    {
      name: 'Blue Background',
      desc: 'Get a Score of at Least 10 on Subtraction Easy Mode',
      color: 'Blue',
      locked: this.auth.highScoreSubEasy < 10

    },
    {
      name: 'Orange Background',
      desc: 'Get a Score of at Least 10 on Multiplication Easy Mode',
      color: 'Orange',
      locked: this.auth.highScoreMultEasy < 10
    },
    {
      name: 'Green Background',
      desc: 'Get a Score of at Least 10 on Division Easy Mode',
      color: 'Green',
      locked: this.auth.highScoreDivEasy < 10
    }
]

  ngOnInit() {
    var user = this.auth.afAuth.auth.currentUser;

    if(user){
      this.logged = true;
    }
  }

}
