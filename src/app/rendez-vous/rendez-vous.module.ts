import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RendezVousComponent } from './rendez-vous.component';
import { EditRendezVousComponent } from './edit-rendez-vous/edit-rendez-vous.component';
import { ListeRendezVousComponent } from './liste-rendez-vous/liste-rendez-vous.component';
import {DropdownModule} from 'primeng/dropdown';



const routes: Routes= [
  {
    path: "",
    component: RendezVousComponent,

    children: [{
     path: "edit-rendez-vous",
     component: EditRendezVousComponent

    },

    {
      path: "liste-rendez-vous",
      component: ListeRendezVousComponent
    }
  ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DropdownModule

  ]
})
export class RendezVousModule { }
