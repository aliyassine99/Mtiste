import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';
import { Patient } from 'src/app/patients/Patient';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.scss']
})
export class EditReservationComponent implements OnInit {

  patientForm: FormGroup;
  rendezVousForm: FormGroup;

  patient: Patient;

  isForm1Submitted: Boolean;
  isForm2Submitted: Boolean;

  @ViewChild('wizardForm') wizardForm: BaseWizardComponent;

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit(): void {

    /**
     * form1 value validation
     */
    this.patientForm = this.formBuilder.group({
      cin: new FormControl("",[Validators.required]),
      nom: new FormControl("",[Validators.required]),
      prenom: new FormControl("",[Validators.required]),
      dateNaissance: new FormControl("",[Validators.required]),
      ville: new FormControl("",[Validators.required]),
      adresse: new FormControl("",[Validators.required]),
      telephone: new FormControl("",[Validators.required]),
      email: new FormControl("",[Validators.required, Validators.email]),
      groupeSanguins: new FormControl(""),
    });

    /**
     * formw value validation
     */
    this.rendezVousForm = this.formBuilder.group({
      dateRendezVous : ['', [Validators.required]],
      heureRendezVous : ['', Validators.required]
    });

    this.isForm1Submitted = false;
    this.isForm2Submitted = false;

  }


  /**
   * Wizard finish function
   */
  finishFunction() {
    alert('Successfully Completed');
  }

  /**
   * Returns form
   */
  get form1() {
    return this.patientForm.controls;
  }

  /**
   * Returns form
   */
  get form2() {
    return this.rendezVousForm.controls;
  }

  /**
   * Go to next step while form value is valid
   */
   onSubmit1() {
    if(this.patientForm.valid) {
      this.wizardForm.goToNextStep();

    }
    this.isForm1Submitted = true;
  }

  /**
   * Go to next step while form value is valid
   */
  form2Submit() {
    if(this.rendezVousForm.valid) {
      this.wizardForm.goToNextStep();
    }
    this.isForm2Submitted = true;
  }


  onSubmit(){}
}
