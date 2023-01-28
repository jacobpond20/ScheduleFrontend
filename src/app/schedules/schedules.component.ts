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
  timeIncrement: number = 2;

  weeks: any;
  currentWeek: any;
  weeklyShifts: any;
  shifts: any;
  people: any;
  avails: any[] = [];

  schedule: any = {
    timeIncrement: 2,
    
  };

  monShifts: any[] = [];
  tueShifts: any[] = [];
  wedShifts: any[] = [];
  thuShifts: any[] = [];
  friShifts: any[] = [];
  satShifts: any[] = [];
  sunShifts: any[] = [];

  monDS: any[] = [];
  tueDS: any[] = [];
  wedDS: any[] = [];
  thuDS: any[] = [];
  friDS: any[] = [];
  satDS: any[] = [];
  sunDS: any[] = [];
  
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
                    this.monDS.push({});
                  }
                  if(ws.day == "tue"){
                    this.tueDS.push(ws);
                  }
                  if(ws.day == "wed"){
                    this.wedDS.push(ws);
                  }
                  if(ws.day == "thu"){
                    this.thuDS.push(ws);
                  }
                  if(ws.day == "fri"){
                    this.friDS.push(ws);
                  }
                  if(ws.day == "sat"){
                    this.satDS.push(ws);
                  }
                  if(ws.day == "sun"){
                    this.sunDS.push(ws);
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
    this.api.getShifts().subscribe((data) => {
      let shifts = data;
      for(let s of shifts){
        if(s.day == "mon"){
          this.monShifts.push({});
        }
        if(s.day == "tue"){
          this.tueShifts.push(s);
        }
        if(s.day == "wed"){
          this.wedShifts.push(s);
        }
        if(s.day == "thu"){
          this.thuShifts.push(s);
        }
        if(s.day == "fri"){
          this.friShifts.push(s);
        }
        if(s.day == "sat"){
          this.satShifts.push(s);
        }
        if(s.day == "sun"){
          this.sunShifts.push(s);
        }
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
