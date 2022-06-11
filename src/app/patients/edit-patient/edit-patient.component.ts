import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Patient } from '../Patient';
@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss']
})
export class EditPatientComponent implements OnInit {

  patient: Patient;


  constructor() { }

  ngOnInit(): void {
  }

  patientForm = new FormGroup({
    cin: new FormControl("",[Validators.required]),
    nom: new FormControl("",[Validators.required]),
    prenom: new FormControl("",[Validators.required]),
    dateNaissance: new FormControl("",[Validators.required]),
    ville: new FormControl("",[Validators.required]),
    adresse: new FormControl("",[Validators.required]),
    telephone: new FormControl("",[Validators.required]),
    email: new FormControl("",[Validators.required, Validators.email]),
    groupeSanguins: new FormControl(""),
  })

  onSubmit(){

    let json=JSON.stringify(this.patientForm.value);
    console.log(this.patient=JSON.parse(json));
  }







}


