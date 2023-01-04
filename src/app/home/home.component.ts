import { createMayBeForwardRefExpression } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { APIService } from '../Service/API.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  username: any;
  message!: string;
  personName!: string;
  personHours!: number;
  personRole!: string;
  peronsAvail!: string;
  roles: string[] = ["Cook", "Line Server", "Manager"];
  user_id: string = "";

  constructor(private api: APIService){}

  ngOnInit(){
    this.username = localStorage.getItem('userData');
    if(this.username == null){
      console.log("No user is logged in.");
    }else{
      const person = this.api.getPerson(this.username);
      const userProg = this.api.getUser(this.username);
      userProg.subscribe((res) => {
        if(res.status == 200){
          this.user_id = res._id;
        }else{
          console.log("getUser didn't work.")
        }
      })
      person.subscribe((res) => {
        if(res.status == 200){

        }else{
          this.message = "Create your profile!"
        }
      })
    }
  }
  onCreatePerson(form: {
    mon_start: number, 
    mon_end: number, 
    tue_start: number,
    tue_end: number,
    wed_start: number,
    wed_end: number,
    thu_start: number,
    thu_end: number,
    fri_start: number,
    fri_end: number,
    sat_start: number,
    sat_end: number,
    sun_start: number,
    sun_end: number,
    name: string, 
    hours: number, 
    role: string}){
      let res = this.api.createPerson(form, this.username);
      res.subscribe((data) => {

      });
    }

}
