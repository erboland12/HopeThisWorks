import { Component, OnInit } from '@angular/core';

@Component({
    selector: "event-list",
    templateUrl: 'event-list.component.html'
})  

export class EventListComponent implements OnInit{
    event1:{
        id: 1;
        name: "test"
    }
    
    ngOnInit(){

    }
}