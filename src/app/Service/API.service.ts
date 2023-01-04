import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn: "root"})
export class APIService{
    readonly base_url = "http://localhost:3000/";
    constructor(private http: HttpClient){}

    createUser(user: {username: string, password: string}){
        console.log(user);
        const headers = new HttpHeaders({'Access-Control-Allow-Origin': 'http://localhost:4200'})
        this.http.post(this.base_url + "createUser/", user, {headers: headers})
        .subscribe((res) => {
            console.log(res);
        });
    }

    login(user: {username: string, password:string}): Observable<any>{
        console.log(user);
        return this.http.post(this.base_url + "login/", user);
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
        return this.http.post(this.base_url + "createPerson", {form, username});
    }
}