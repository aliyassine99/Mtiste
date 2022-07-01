
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Route, Router } from '@angular/router';

import { WizardComponent as BaseWizardComponent } from 'angular-archwizard'
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { PatientDto } from 'src/app/modals/PatientDto';
import { RendezVousDto } from 'src/app/modals/RendezVousDto';
import { Patient } from 'src/app/patients/Patient';
import { RendezVousService } from '../rendez-vous.service';

@Component({
  selector: 'app-edit-rendez-vous',
  templateUrl: './edit-rendez-vous.component.html',
  styleUrls: ['./edit-rendez-vous.component.scss'],
  providers: [MessageService]
})
export class EditRendezVousComponent implements OnInit {


  patientForm: FormGroup;
  rendezVousForm: FormGroup;

  savedPatient: Patient;

  savedRendezVous: RendezVousDto;

  isForm1Submitted: Boolean;
  isForm2Submitted: Boolean;

  rdvExisteDeja: boolean;
  rdvExisteDejaHeure: boolean;



  @ViewChild('wizardForm') wizardForm: BaseWizardComponent;

  constructor(public formBuilder: FormBuilder, private rdvService: RendezVousService, private route: Router,private messageService: MessageService, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {

    /**
     * form1 value validation
     */
    this.patientForm = this.formBuilder.group({
      cin: new FormControl("",[Validators.required]),
      nomPrenom: new FormControl("",[Validators.required]),
      dateNaissance: new FormControl("",[Validators.required]),
      sexe: new FormControl("",[Validators.required]),
      email: new FormControl("",[Validators.required, Validators.email]),
      telephone: new FormControl("",[Validators.required]),
      adresse: new FormControl("",[Validators.required]),

        });

        this.primengConfig.ripple = true;

    /**
     * formw value validation
     */
    this.rendezVousForm = this.formBuilder.group({
      dateVisite : ['', [Validators.required]],
      heureVisite : ['', Validators.required]
    });

    this.isForm1Submitted = false;
    this.isForm2Submitted = false;

  }


  /**
   * Wizard finish function
   */
  finishFunction() {
    this.route.navigate(["/rendez-vous/rendez-vous"]);
    this.messageService.add({severity:'success', summary: 'Succes', detail: 'Rendez vous bien ajouté'});
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





const patientRdv: PatientDto = {
  "cin":this.patientForm.controls["cin"].value,
  "nomPrenom":this.patientForm.controls["nomPrenom"].value,
  "dateNaissance":this.patientForm.controls["dateNaissance"].value,
  "sexe":this.patientForm.controls["sexe"].value,
  "email":this.patientForm.controls["email"].value,
  "telephone":this.patientForm.controls["telephone"].value,
  "adresse":this.patientForm.controls["adresse"].value,
  "rendezVous":[{
    "dateVisite": this.rendezVousForm.controls["dateVisite"].value,
    "heureVisite": this.rendezVousForm.controls["heureVisite"].value,
  }]
};

let object = JSON.stringify(patientRdv);
console.log(object);

this.rdvService.addRendezVousToPatient(patientRdv).subscribe(
  response =>{
    console.log(response);
  }, (error)=>{
    if(error.error){
      this.rdvExisteDeja = true;
    }

    console.log(error.error);

  }
);

}


onConfirm() {
    this.messageService.clear('c');
}

onReject() {
    this.messageService.clear('c');
}

clear() {
    this.messageService.clear();
}






}
