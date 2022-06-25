import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrdonnanceComponent } from './ordonnance.component';
import { Children } from 'preact/compat';
import { ListeOrdonnanceComponent } from './liste-ordonnance/liste-ordonnance.component';


const routes: Routes=[
      {
        path: "",
        component: OrdonnanceComponent,
        children:[{
            path: "liste-ordonnance",
            component: ListeOrdonnanceComponent
        }]
      }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class OrdonnanceModule { }
