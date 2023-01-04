import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../Service/API.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  readonly ROOT_URL = 'localhost:3000/';
  response: any;
  constructor(private http: HttpClient, private apiService: APIService, private router: Router){}


  onLogin(user: {username: string, password: string}){
    let res = this.apiService.login(user);
    res.subscribe((data) => {
      if(data == null){
        console.log("Working");
        if(localStorage.getItem('userData') != user.username){
          localStorage.setItem('userData', user.username);
        }
        this.router.navigate(['/home']);
      }else{
        this.router.navigate(['/'])
      }
    });
  }
}
