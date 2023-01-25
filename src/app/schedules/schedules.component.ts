import { Component, Injectable, Input, OnInit } from '@angular/core';
import { APIService } from '../Service/API.service';
import '@material/grid-list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit{
  scheduleSelection: string = "";
  @Input() homeView: boolean = false;
  message!: string;
  times: string[] = ["12am", "2am", "4am", "6am", "8am", "10am", "12pm", "2pm", "4pm", "6pm", "8pm", "10pm", "12am"];

  weeks: any;
  currentWeek: any;
  weeklyShifts: any;
  shifts: any;
  people: any;
  avails: any[] = [];

  mon: any[] = [];
  tue: any[] = [];
  wed: any[] = [];
  thu: any[] = [];
  fri: any[] = [];
  sat: any[] = [];
  sun: any[] = [];
  
  constructor(private api: APIService, private router: Router){}

  ngOnInit(): void {
    this.api.getPeople().subscribe((data) => {
      if(data.status == 200){
        this.people = data.body;
        for(let p of this.people){
          this.api.getAvail(p.availability).subscribe((data1) => {
            this.avails.push(data1.avail)
          });
        }
        this.api.getWeeks().subscribe((data2) =>{
          if(data2.status == 202){
            this.message = data2.message;
          }else if(data2.status == 200){
            this.weeks = data2.body.weeks;
            if(data2.body.message == "Current"){
              this.currentWeek = data2.body.currentWeek;
              this.scheduleSelection = this.currentWeek.name;
              this.api.getWeeklyShifts(this.currentWeek._id).subscribe((data3) => {
                this.weeklyShifts = data3;
                for(let ws of this.weeklyShifts){

                  if(ws.day == "mon"){
                    this.mon.push({});
                  }
                  if(ws.day == "tue"){
                    this.tue.push(ws);
                  }
                  if(ws.day == "wed"){
                    this.wed.push(ws);
                  }
                  if(ws.day == "thu"){
                    this.thu.push(ws);
                  }
                  if(ws.day == "fri"){
                    this.fri.push(ws);
                  }
                  if(ws.day == "sat"){
                    this.sat.push(ws);
                  }
                  if(ws.day == "sun"){
                    this.sun.push(ws);
                  }
                }
              });
            }else{
              this.message = data.message;
            }
          }
        })
      }
    });
    
  }

  onGenerate(form: {scheduleName: string, startDate: Date, endDate: Date}){
    console.log(form);
    this.api.generateSchedule(form).subscribe((data) =>{
      console.log(data);
    });
  }
  
  onViewWeek(form: {weekSelection: string}){
    this.scheduleSelection = form.weekSelection;
    for(let w of this.weeks){
      if(w.name == form.weekSelection){
        this.currentWeek = w;
      }
    }
  }

  onDeleteSchedule(){
    this.api.deleteSchedule(this.currentWeek._id).subscribe((data) => {
      location.reload();
    });
  }


}
