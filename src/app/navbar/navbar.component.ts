import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Input() home: string = "";
  @Input() shifts: string = "";
  @Input() people: string = "";
  @Input() schedulePage: string = "";

  constructor(private router: Router){}



}
