import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  readonly ROOT_URL = 'localhost:3000/';
  response: any;
  constructor(private http: HttpClient){}

  postCreds(username: string, password: string){
    this.response = this.http.post(this.ROOT_URL + 'createUser', {username, password});
    console.log(this.response);
  }
}
