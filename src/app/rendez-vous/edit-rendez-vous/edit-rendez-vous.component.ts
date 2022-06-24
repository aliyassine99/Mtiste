import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Patient } from 'src/app/patients/Patient';
import { RendezVous } from '../RendezVous';

@Component({
  selector: 'app-edit-rendez-vous',
  templateUrl: './edit-rendez-vous.component.html',
  styleUrls: ['./edit-rendez-vous.component.scss']
})
export class EditRendezVousComponent implements OnInit {





  selectedPatient: Patient;

  patients: Patient[];
  patient: Patient;


  constructor(private httpClient: HttpClient) {

    this.patients = [
      {
        "id": 1,
        "cin": "BQ12",
        "nom": "Jack",
        "prenom": "Pace",
        "dateNaissance": new Date,
        "telephone": 923469828,
        "email": "douglas@gmail"
},
      {
        "id": 2,
        "cin": "BQ12",
        "nom": "Lucas",
        "prenom": "Pace",
        "dateNaissance": new Date,
        "telephone": 923469828,
        "email": "douglas@gmail"
 }, {
  "id": 3,
        "cin": "BQ12",
        "nom": "Douglas",
        "prenom": "Pace",
        "dateNaissance": new Date,
        "telephone": 923469828,
        "email": "douglas@gmail"
}, {
  "id": 4,
        "cin": "BQ12",
        "nom": "Sam",
        "prenom": "Pace",
        "dateNaissance": new Date,
        "telephone": 923469828,
        "email": "douglas@gmail"
   }, {
    "id": 5,
        "cin": "BQ12",
        "nom": "Douglas",
        "prenom": "Pace",
        "dateNaissance": new Date,
        "telephone": 923469828,
        "email": "douglas@gmail"
 }];
   }

  ngOnInit(): void {
  }

  rendezVousForm: FormGroup = new FormGroup({
    "dateRendezVous" : new FormControl("",[Validators.required]),
    "patient": new FormControl("", [Validators.required]),
    "description" : new FormControl("",[Validators.required]),
    "hourRendezVous": new FormControl("",[Validators.required])
  });

  onSubmit(){


    const rendezVous: RendezVous = new RendezVous("knk",22,"sjkfj",`${this.rendezVousForm.value.dateRendezVous}`,`${this.rendezVousForm.value.hourRendezVous}`);

    this.httpClient.post("http://localhost:8888/admin/create", rendezVous).subscribe();





    console.log(rendezVous);

  }





}
