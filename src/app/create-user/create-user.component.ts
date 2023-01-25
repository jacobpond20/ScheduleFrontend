import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIService } from '../Service/API.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent{
  readonly ROOT_URL = 'localhost:3000/';
  response: any;
  constructor(private http: HttpClient, private apiService: APIService, private router: Router){}


  onUserCreate(user: {username: string, password: string}){
    this.apiService.createUser(user).subscribe((data) => {
      if(data.status == 200){
        if(localStorage.getItem('userData') != user.username){
          localStorage.setItem('userData', user.username);
        }
        this.router.navigate(['/home']);
      }
    });
  }
}
