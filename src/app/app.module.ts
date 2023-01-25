import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { APIService } from './Service/API.service';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ShiftsComponent } from './shifts/shifts.component';
import { PeopleComponent } from './people/people.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SchedulePageComponent } from './schedule-page/schedule-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateUserComponent,
    HomeComponent,
    ShiftsComponent,
    PeopleComponent,
    SchedulesComponent,
    NavbarComponent,
    SchedulePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    APIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
