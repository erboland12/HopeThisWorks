import { Component, OnInit } from '@angular/core';
import { SubtractPage } from '../subtract/subtract.page';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {
  public sub: SubtractPage;
  constructor(public subtract: SubtractPage) {
    this.sub = subtract; 
  }
  ngOnInit() {
  }


}
