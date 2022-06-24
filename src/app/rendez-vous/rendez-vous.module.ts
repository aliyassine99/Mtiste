import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RendezVousComponent } from './rendez-vous.component';
import { EditRendezVousComponent } from './edit-rendez-vous/edit-rendez-vous.component';
import { ListeRendezVousComponent } from './liste-rendez-vous/liste-rendez-vous.component';
import {DropdownModule} from 'primeng/dropdown';
import { TableRdvComponent } from './table-rdv/table-rdv.component';



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
    },
    {
      path: "rendez-vous",
      component: TableRdvComponent
    }
  ]
  }
]

@NgModule({
  declarations: [



  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

  ]
})
export class RendezVousModule { }
