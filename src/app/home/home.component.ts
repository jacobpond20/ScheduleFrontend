import { Time } from '@angular/common';
import { createMayBeForwardRefExpression } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../Service/API.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  admin!: boolean;
  username: any;
  message!: string;
  personName!: string;
  personHours!: number;
  personRole!: string;
  personAvail: any;
  availID!: string;
  roles: [string, boolean][] = [];
  user_id: string = "";
  newPerson: boolean = false;

  editAvail: boolean = false;

  hours: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  minutes: string[] = ["00", "30"];

  constructor(private api: APIService, private router: Router){}

  async ngOnInit(){
    this.username = localStorage.getItem('userData');
    if(this.username == null){
      console.log("No user is logged in.");
    }else{
      const person = this.api.getPerson(this.username);
      const userProg = this.api.getUser(this.username);
      const froles = this.api.getRoles();
      userProg.subscribe((res) => {
        if(res.status == 200){
          this.user_id = res._id;
          this.admin = res.admin;
        }else{
          console.log("getUser didn't work.")
        }
      });
      person.subscribe((res) => {
        console.log(res);
        if(res.status == 200){
          this.personName = res.body.name;
          this.personRole = res.body.role;
          this.personHours = res.body.hours;
          this.availID = res.body.availability;
          this.api.getAvail(this.availID).subscribe((data) => {
            this.personAvail = data;
          })
        }else{
          this.newPerson = true;
        }
      });
      froles.subscribe((data) => {
        for(var d of data){
          console.log(d);
          this.roles.push([d.role, d.admin]);
        }
      });
    }
  }

  onCreatePerson(form: {
    mon_start_hour: string,
    mon_start_min: string,
    mon_start_am_pm: string,
    mon_end_hour: string,
    mon_end_min: string,
    mon_end_am_pm: string,
    tue_start_hour: string,
    tue_start_min: string,
    tue_start_am_pm: string,
    tue_end_hour: string,
    tue_end_min: string,
    tue_end_am_pm: string,
    wed_start_hour: string,
    wed_start_min: string,
    wed_start_am_pm: string,
    wed_end_hour: string,
    wed_end_min: string,
    wed_end_am_pm: string,
    thu_start_hour: string,
    thu_start_min: string,
    thu_start_am_pm: string,
    thu_end_hour: string,
    thu_end_min: string,
    thu_end_am_pm: string,
    fri_start_hour: string,
    fri_start_min: string,
    fri_start_am_pm: string,
    fri_end_hour: string,
    fri_end_min: string,
    fri_end_am_pm: string,
    sat_start_hour: string,
    sat_start_min: string,
    sat_start_am_pm: string,
    sat_end_hour: string,
    sat_end_min: string,
    sat_end_am_pm: string,
    sun_start_hour: string,
    sun_start_min: string,
    sun_start_am_pm: string,
    sun_end_hour: string,
    sun_end_min: string,
    sun_end_am_pm: string,
    name: string, 
    hours: number, 
    role: string})
  {
    let parsedForm = {
      mon_start: 0, 
      mon_end: 0, 
      tue_start: 0,
      tue_end: 0,
      wed_start: 0,
      wed_end: 0,
      thu_start: 0,
      thu_end: 0,
      fri_start: 0,
      fri_end: 0,
      sat_start: 0,
      sat_end: 0,
      sun_start: 0,
      sun_end: 0,
      name: form.name, 
      hours: form.hours, 
      role: form.role
    };
    parsedForm.mon_start = this.parseTime(form.mon_start_hour, form.mon_start_min, form.mon_start_am_pm);
    parsedForm.tue_start = this.parseTime(form.tue_start_hour, form.tue_start_min, form.tue_start_am_pm);
    parsedForm.wed_start = this.parseTime(form.wed_start_hour, form.wed_start_min, form.wed_start_am_pm);
    parsedForm.thu_start = this.parseTime(form.thu_start_hour, form.thu_start_min, form.thu_start_am_pm);
    parsedForm.fri_start = this.parseTime(form.fri_start_hour, form.fri_start_min, form.fri_start_am_pm);
    parsedForm.sat_start = this.parseTime(form.sat_start_hour, form.sat_start_min, form.sat_start_am_pm);
    parsedForm.sun_start = this.parseTime(form.sun_start_hour, form.sun_start_min, form.sun_start_am_pm);

    parsedForm.mon_end = this.parseTime(form.mon_end_hour, form.mon_end_min, form.mon_end_am_pm);
    parsedForm.tue_end = this.parseTime(form.tue_end_hour, form.tue_end_min, form.tue_end_am_pm);
    parsedForm.wed_end = this.parseTime(form.wed_end_hour, form.wed_end_min, form.wed_end_am_pm);
    parsedForm.thu_end = this.parseTime(form.thu_end_hour, form.thu_end_min, form.thu_end_am_pm);
    parsedForm.fri_end = this.parseTime(form.fri_end_hour, form.fri_end_min, form.fri_end_am_pm);
    parsedForm.sat_end = this.parseTime(form.sat_end_hour, form.sat_end_min, form.sat_end_am_pm);
    parsedForm.sun_end = this.parseTime(form.sun_end_hour, form.sun_end_min, form.sun_end_am_pm);

    let res = this.api.createPerson(parsedForm, this.username);
    res.subscribe((data) => {
      if(data.status == 201){
        this.personName = form.name;
        this.personHours = form.hours;
        this.personRole = form.role;
      }
    });
  }

   parseTime(hour: string, min: string, am_pm: string): number{
    let finalParsed: number = 0;
    if(am_pm == "am"){
      if(hour != "12"){
        finalParsed += Number(hour);
      }
      if(min == "30"){
        finalParsed += 0.5;
      }
    }else{
      if(hour != "12"){
        finalParsed += 12 + Number(hour);
      }else{
        finalParsed += 12;
      }
      if(min == "30"){
        finalParsed += 0.5;
      }
    }
    return finalParsed;
   } 
    
  onUpdateAvail(){
    if(this.editAvail == true){
      this.editAvail = false;
    }else{
      this.editAvail = true;
    }
  }

  onSaveAvail(form: {mon_start: Number,
              mon_end: Number,
              tue_start: Number,
              tue_end: Number,
              wed_start: Number,
              wed_end: Number,
              thu_start: Number,
              thu_end: Number,
              fri_start: Number,
              fri_end: Number,
              sat_start: Number,
              sat_end: Number,
              sun_start: Number,
              sun_end: Number})
  {
    let res = this.api.updateAvail(this.availID, form);
    res.subscribe((data) => {
      this.personAvail = data;
    })
    this.editAvail = false;
    location.reload();
  }
}
