import { Injectable, OnInit } from '@angular/core';
import { RendezVousDto } from 'src/app/modals/RendezVousDto';
import { PatientsService } from 'src/app/patients/patients.service';
import { RendezVousService } from 'src/app/rendez-vous/rendez-vous.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService implements OnInit{


  rendezVous: RendezVousDto[];

  constructor(private patientService: PatientsService, private rendezVousService: RendezVousService) {

   }


   ngOnInit(): void {

   }



   getRendezVous(){
    this.rendezVousService.getRendezVous().subscribe(
      (response: RendezVousDto[]) => {
        this.rendezVous = response;
      }
    );
   }
}
