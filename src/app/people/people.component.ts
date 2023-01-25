import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../Service/API.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit{

  people: any;

  constructor(private api: APIService, private router: Router){}

  ngOnInit(): void {
    this.api.getPeople().subscribe((data) => {
      this.people = data.body;
    });
  }
}
