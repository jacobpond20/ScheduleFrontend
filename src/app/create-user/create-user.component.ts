import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIService } from '../Service/API.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent{
  readonly ROOT_URL = 'localhost:3000/';
  response: any;
  constructor(private http: HttpClient, private apiService: APIService){}


  onUserCreate(user: {username: string, password: string}){
    this.apiService.createUser(user);
  }
}
