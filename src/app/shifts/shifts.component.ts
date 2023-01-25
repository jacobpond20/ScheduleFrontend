import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../Service/API.service';

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.css']
})
export class ShiftsComponent implements OnInit{

  message: string = "";
  roles: [string, boolean][] = [];
  roleCreatedMessage: string = "";
  createRole: boolean = false;
  createShift: boolean = false;
  shifts!: any[];
  dayOptions: string[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  dayChoices: {[index: string]:boolean} = {"mon": false, "tue": false, "wed": false, "thu": false, "fri": false, "sat": false, "sun": false};

  constructor(private http: HttpClient, private api: APIService, private router: Router){}

  ngOnInit(): void {
    let res = this.api.getShifts();
    console.log("After api call.");
    res.subscribe((data) => {
      console.log(data.body);
      this.shifts = data.body;
    })
    let tempRoles = this.api.getRoles();
    tempRoles.subscribe((data) => {
      for(var d of data){
        this.roles.push([d.role, d.admin]);
      }
    })
  }

  homeButton(){
    this.router.navigate(['/home']);
  }

  onDisplayRole(){
    if(this.createRole == true){
      this.createRole = false;
    }else{
      this.createRole = true;
    }
  }

  onCreateRole(form: {role: string, admin: string}){
    console.log(form);
    if(form.admin == ""){
      this.api.createRole(form.role, false).subscribe();
    }else{
      this.api.createRole(form.role, true).subscribe();
    }
    this.roleCreatedMessage = "New Role Created.";
    this.createRole = false;
  }

  switchShift(){
    if(this.createShift == false){
      this.createShift = true;
    }else{
      this.createShift = false;
    }
  }
  onCreateShift(form: {shiftName: string, shiftRole: string, startTime: number, endTime: number, days: string[]}){
    console.log(form.days);
    for(var d of form.days){
      this.dayChoices[d] = true;
    }
    let shift = 
    {
      name: form.shiftName, 
      role: form.shiftRole, 
      start: form.startTime, 
      end: form.endTime, 
      mon: this.dayChoices["mon"],
      tue: this.dayChoices["tue"],
      wed: this.dayChoices["wed"],
      thu: this.dayChoices["thu"],
      fri: this.dayChoices["fri"],
      sat: this.dayChoices["sat"],
      sun: this.dayChoices["sun"]
    }
    let res = this.api.createShift(shift);
    res.subscribe((data) => {
      console.log(data);
      if(data.status == 201){
        this.createShift = false;
        location.reload();
      }else{
        this.message = data.body.message;
      }
    });
  }
}
