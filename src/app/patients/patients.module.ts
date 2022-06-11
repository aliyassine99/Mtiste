import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsComponent } from './patients.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { RouterModule, Routes } from '@angular/router';
import { ListePatientsComponent } from './liste-patients/liste-patients.component';
import { ConfirmationService } from 'primeng/api';




const routes: Routes = [
  {
    path: '',
    component: PatientsComponent,
    children: [

      {
        path: 'edit-patient',
        component: EditPatientComponent
      },
      {
        path: 'liste',
        component: ListePatientsComponent
      }

    ]
  }
]

@NgModule({


  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class PatientsModule { }
