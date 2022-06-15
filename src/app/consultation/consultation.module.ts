import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ConsultationComponent } from './consultation.component';
import { EditConsultationComponent } from './edit-consultation/edit-consultation.component';
import { ListeConsultationComponent } from './liste-consultation/liste-consultation.component';





const routes: Routes = [
  {
    path: '',
    component: ConsultationComponent,
    children: [

      {
        path: 'edit-consultation',
        component: EditConsultationComponent
      },
      {
        path: 'liste',
        component: ListeConsultationComponent
      }

    ]
  }
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)

  ]
})
export class ConsultationModule { }
