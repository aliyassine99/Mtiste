import { Component, OnInit, ViewChild } from '@angular/core';

import { Patient } from '../Patient';
import {ConfirmationService} from 'primeng/api';
import {Message} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, NgForm } from '@angular/forms';
import { PatientsService } from '../patients.service';
import { Employee } from '../Employee';
import { PatientDto } from 'src/app/modals/PatientDto';
import { FactureDto } from 'src/app/modals/FactureDto';

import * as XLSX from 'xlsx';
import { FactureServiceService } from 'src/app/facture/facture-service.service';
import { Router } from '@angular/router';
import { throwIfEmpty } from 'rxjs';

@Component({
  selector: 'app-liste-patients',
  templateUrl: './liste-patients.component.html',
  styles: [`
  :host ::ng-deep button {
      margin-right: .25em;
  }
`],
providers: [ConfirmationService],
})
export class ListePatientsComponent implements OnInit {


  msgs: Message[] = [];
  form: FormGroup;
  closeResult = '';
  editPatient: PatientDto;
  patientMoreInfos: PatientDto;
  showDetailDialog: boolean;
  editPatientModal: boolean;
  factureModal: boolean;
  pageOfItems: Array<any>;
  patientIdFacture: any;
  term: any;



  @ViewChild("patientEditForm") patientEditForm: NgForm;

  @ViewChild("factureForm") factureForm: NgForm;





  position: string;

  patients: PatientDto[] = [



  ];


  constructor(private router: Router,private factureService: FactureServiceService,private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig,private modalService: NgbModal,private patientService: PatientsService) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.getPatients();



  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}

  confirm1(patientId:number) {
      this.confirmationService.confirm({
          message: 'Êtes-vous sûr de vouloir continuer ?',
          header: 'Confirmation',
          acceptLabel:"Oui",
          rejectLabel:"Non",
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.patientService.deletePatient(patientId).subscribe(
              (element: void)=>{
                console.log("deleted");
                this.getPatients();
              }
            )
              this.msgs = [{severity:'success', summary:'Confirmé', detail:'Les données bien supprimé'}];

          },
          reject: () => {
              this.msgs = [{severity:'info', summary:'Annulé', detail:'Vous avez rejeté votre operation'}];
          }
      });
  }

  open(patient:Patient,content:any) {
    this.editPatient= patient;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.editPatient= patient;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  showEditPatientModal(patient: PatientDto){
    this.editPatient= patient;
    this.editPatientModal= true;
    this.showDetailDialog= false;
    this.factureModal = false;
    this.editPatient= patient;


  }

  showMoreInfos(patient: PatientDto){
    this.editPatientModal=false;
    this.showDetailDialog= true;
    this.factureModal = false;
    this.patientMoreInfos= patient;
  }

  showFactureModule(patient: PatientDto){
    this.editPatientModal=false;
    this.showDetailDialog= false;
    this.factureModal = true;
    this.patientIdFacture= patient.id;
  }

  onAddFacture(){

    const facturePatient: PatientDto ={

      "id":  this.factureForm.value.id,
      "factures":
      [
        { "montant": this.factureForm.value.montant}
        ]

    }

    console.log(facturePatient);

    this.factureService.addFacture(facturePatient).subscribe(
      element=>{
        console.log(element);
      }, error=>{
        console.log(error);
      }
    );

    this.factureModal= false;
    this.router.navigate(["facture/liste-factures"]);

  }

  onUpdatePatient(updatedPatient: PatientDto, idPatient:any){
    console.log(updatedPatient);
    this.patientService.updatePatient(updatedPatient,idPatient).subscribe(
      (element: PatientDto)=>{
        this.getPatients();
        console.log(element);
      }
    )
    this.editPatientModal = false;
  }


  getPatients(): void{
    this.patientService.getPatients().subscribe(
      (response: PatientDto[])=>{
      this.patients = response;
    });
  }







}
