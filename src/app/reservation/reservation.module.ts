import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReservationComponent } from './reservation.component';
import { EditReservationComponent } from './edit-reservation/edit-reservation.component';


const routes: Routes= [{
  path: "", component: ReservationComponent
  , children: [{
    path:"edit-reservation",
    component: EditReservationComponent
  }]
}]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)


  ]
})
export class ReservationModule { }
