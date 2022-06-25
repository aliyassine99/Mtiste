import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FactureComponent } from './facture.component';
import { AppRoutingModule } from '../app-routing.module';
import { ListeFacturesComponent } from './liste-factures/liste-factures.component';


const routes: Routes=[{
  path: "",
  component: FactureComponent,
  children: [{

      path: "liste-factures",
      component: ListeFacturesComponent
  }]
}]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class FactureModule { }
