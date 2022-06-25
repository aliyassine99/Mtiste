import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { WizardComponent as BaseWizardComponent } from 'angular-archwizard'
import { PatientDto } from 'src/app/modals/PatientDto';
import { RendezVousDto } from 'src/app/modals/RendezVousDto';
import { Patient } from 'src/app/patients/Patient';

@Component({
  selector: 'app-edit-rendez-vous',
  templateUrl: './edit-rendez-vous.component.html',
  styleUrls: ['./edit-rendez-vous.component.scss']
})
export class EditRendezVousComponent implements OnInit {


  patientForm: FormGroup;
  rendezVousForm: FormGroup;

  savedPatient: Patient;
  savedRendezVous: RendezVousDto;

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
      nomComplet: new FormControl("",[Validators.required]),
      dateNaissance: new FormControl("",[Validators.required]),
      sexe: new FormControl("",[Validators.required]),
      email: new FormControl("",[Validators.required, Validators.email]),
      telephone: new FormControl("",[Validators.required]),
      adresse: new FormControl("",[Validators.required]),

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


  onSubmit(){


    /*const savePatient:PatientDto  = new PatientDto(undefined,
      this.patientForm.controls["cin"].value,
      this.patientForm.controls["nomComplet"].value,
      this.patientForm.controls["dateNaissance"].value,
      this.patientForm.controls["sexe"].value,
      this.patientForm.controls["mail"].value,
      this.patientForm.controls["telephone"].value,
      this.patientForm.controls["adresse"].value
      );*/
      let json=JSON.stringify(this.patientForm.value);
this.savedPatient=JSON.parse(json);


const model: PatientDto={
  cin:this.patientForm.controls["cin"].value,
  nomComplet:this.patientForm.controls["nomComplet"].value,
  dateNaissance:this.patientForm.controls["dateNaissance"].value,
  sexe:this.patientForm.controls["sexe"].value,
  email:this.patientForm.controls["email"].value,
  telephone:this.patientForm.controls["telephone"].value,
  adresse:this.patientForm.controls["adresse"].value,
  rendezVous:[{
    dateRdv: this.rendezVousForm.controls["dateRendezVous"].value,
    heureRdv: this.rendezVousForm.controls["heureRendezVous"].value,
  }]
};


console.log(model);









  }





}
