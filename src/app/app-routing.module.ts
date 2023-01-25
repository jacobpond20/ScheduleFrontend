import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PeopleComponent } from './people/people.component';
import { SchedulePageComponent } from './schedule-page/schedule-page.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { ShiftsComponent } from './shifts/shifts.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'create-user', component: CreateUserComponent},
  {path: 'home', component: HomeComponent},
  {path: 'shifts', component: ShiftsComponent},
  {path: 'people', component: PeopleComponent},
  {path: 'schedule-page', component: SchedulePageComponent},
  {path: 'schedules', component: SchedulesComponent},
  {path: '**', redirectTo:'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
