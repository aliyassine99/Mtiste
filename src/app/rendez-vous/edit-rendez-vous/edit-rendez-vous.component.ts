import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Patient } from 'src/app/patients/Patient';

@Component({
  selector: 'app-edit-rendez-vous',
  templateUrl: './edit-rendez-vous.component.html',
  styleUrls: ['./edit-rendez-vous.component.scss']
})
export class EditRendezVousComponent implements OnInit {





  selectedPatient: Patient;

  patients: Patient[];
  patient: Patient;


  constructor() {

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
    "description" : new FormControl("",[Validators.required])
  });

  onSubmit(){


    let json=JSON.stringify(this.rendezVousForm.value);
    console.log(this.patient=JSON.parse(json));

  }





}
