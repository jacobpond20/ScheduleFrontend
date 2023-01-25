import { Time } from "@angular/common";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn: "root"})
export class APIService{
    readonly base_url = "http://localhost:3000/";
    constructor(private http: HttpClient){}

    createUser(user: {username: string, password: string}){
        return this.http.post(this.base_url + "user/create/", user, {observe: 'response'});
    }

    login(user: {username: string, password:string}): Observable<any>{
        return this.http.post(this.base_url + "login/", user, {responseType: 'text'});
    }

    getPerson(username: string): Observable<any>{
        return this.http.get(this.base_url + 'viewPeople/' + username, {observe: 'response'});
    }

    getUser(username: string): Observable<any>{
        return this.http.get(this.base_url + "user/" + username, {observe: 'response'});
    }

    createPerson(form: {mon_start: number, mon_end: number, tue_start: number,tue_end: number,wed_start: number,wed_end: number,thu_start: number,thu_end: number,
                        fri_start: number,fri_end: number,sat_start: number, sat_end: number, sun_start: number, sun_end: number, name: string,  hours: number,
                        role: string}, username:string): Observable<any>{
        return this.http.post(this.base_url + "createPerson", {form, username}, {observe: 'response'});
    }

    createShift(form: {name: string, role: string, start: number, end: number, mon: boolean, tue: boolean, wed: boolean, thu: boolean, fri: boolean, sat: boolean, sun: boolean}): Observable<any>
    {
        return this.http.post(this.base_url + "shift/create", form, {observe: 'response'});
    }

    getRoles(): Observable<any>{
        return this.http.get(this.base_url + "role/", {responseType: 'json'});
    }

    createRole(role: string, admin: boolean): Observable<any>{
        return this.http.post(this.base_url + "role/", {role, admin}, {observe: 'response'});
    }

    getAvail(avail: string): Observable<any>{
        console.log(avail);
        return this.http.post(this.base_url + 'availability/fetch/', {avail: avail}, {responseType: 'json'});
    }

    getShifts(): Observable<any>{
        return this.http.get(this.base_url + "shift/all", {observe: 'response'});
    }

    updateAvail(availID: string, avail:{mon_start: Number,
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
                                        sun_end: Number,}): Observable<any>
    {
        return this.http.post(this.base_url + "availability/edit", {availID: availID, avail: avail}, {observe: 'response'});
    }

    getPeople(): Observable<any>{
        return this.http.get(this.base_url + "viewPeople", {observe: 'response'});
    }

    getWeeks(): Observable<any>{
        return this.http.get(this.base_url + "week/all", {observe: 'response'})
    }

    getCurrentWeek(): Observable<any>{
        return this.http.get(this.base_url + "week/current", {observe: 'response'});
    }

    getWeeklyShifts(weekID: string): Observable<any>{
        return this.http.post(this.base_url + "weeklyShifts", {weekID: weekID});
    }

    generateSchedule(form: {scheduleName: string, startDate: Date, endDate: Date}): Observable<any>{
        return this.http.post(this.base_url + "week/generate", {scheduleName: form.scheduleName, startDate: form.startDate, endDate: form.endDate})
    }

    deleteSchedule(weekID: string): Observable<any>{
        return this.http.post(this.base_url + "week/delete", {weekID: weekID}, {observe: 'response'})
    }
}