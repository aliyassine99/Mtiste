import { Component, OnInit, ViewChild } from '@angular/core';


import {ConfirmationService, MessageService} from 'primeng/api';
import {Message} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Patient } from 'src/app/patients/Patient';
import { PatientsService } from 'src/app/patients/patients.service';
import { Employee } from 'src/app/patients/Employee';
import { RendezVousDto } from 'src/app/modals/RendezVousDto';
import { ConsultationDto } from 'src/app/modals/ConsulationDto';
import { RendezVousService } from '../rendez-vous.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-rdv',
  templateUrl: './table-rdv.component.html',
  styles: [`
  :host ::ng-deep button {
      margin-right: .25em;
  }
`],
providers: [ConfirmationService, MessageService],
})
export class TableRdvComponent implements OnInit {


  msgs: Message[] = [];
  form: FormGroup;
  consultationForm: FormGroup;
  closeResult = '';
  editRendezVous: RendezVousDto;
  modifierRdvModal: boolean;
  consultationModal: boolean;

  rendezVousMoreDetails: RendezVousDto;

  plusDetailRdvModal: boolean;
  term: any;
  errorValue: string;

  @ViewChild("saveConsultationForm") saveConsultationForm: NgForm;
  @ViewChild("rendezVousEditForm") rendezVousEditForm: NgForm;


  selectedOne:any = "jbac";


  position: string;

  allRendezVous: RendezVousDto[] = [];


  constructor(private router :Router,private messageService: MessageService,private rendezVousSerive: RendezVousService, private formBuilder: FormBuilder,private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig,private modalService: NgbModal,private patientService: PatientsService) {}

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.getRendezVous();






  }
  public getRendezVous(){
    this.rendezVousSerive.getRendezVous().subscribe((response: RendezVousDto[])=>{

      this.allRendezVous = response;
      for(let i =0; i<this.allRendezVous.length; i++){
        if(this.allRendezVous[i].etat == "EN_ATTENTE"){
          this.allRendezVous[i].etat = "En attente";
        }
        if(this.allRendezVous[i].etat == "FAIT"){
          this.allRendezVous[i].etat = "Fait";
        }
        else{
          this.allRendezVous[i].etat = "Annule";
        }
      }
    }, (error) =>{
      console.log(error.error);
    })
  }
  confirm1(idRdv: number) {
      this.confirmationService.confirm({
          message: 'Êtes-vous sûr de vouloir continuer ?',
          header: 'Confirmation',
          acceptLabel:"Oui",
          rejectLabel:"Non",
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.rendezVousSerive.deleteRendezVous(idRdv).subscribe(
              element => {
                console.log(element);
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

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

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

  showModfierRdvModal(rdv: RendezVousDto){

    this.modifierRdvModal= true;
    this.consultationModal= false;

    this.plusDetailRdvModal= false;

    this.editRendezVous= rdv;


  }

  showConsultationModal(rdv: RendezVousDto){

    this.modifierRdvModal= false;
    this.consultationModal= true;

    this.plusDetailRdvModal= false;

    this.selectedOne= rdv.id;


  }


  showDetailRdvModal(idRendezVous: RendezVousDto){

    this.modifierRdvModal= false;
    this.consultationModal= false;

    this.plusDetailRdvModal= true;
    this.rendezVousMoreDetails = idRendezVous;

    console.log(this.rendezVousMoreDetails);


  }


  onSubmitConsultationForm(){


    const consultation: RendezVousDto = {
      "id":  this.saveConsultationForm.value.id ,
      "consultation": {"description": this.saveConsultationForm.value.description}
    }



    let object = JSON.stringify(consultation);


    console.log(object);
   this.rendezVousSerive.addConsultation(consultation).subscribe(
    (element: ConsultationDto) => {
      console.log(element);
      console.log(element);
    }
   )
   this.consultationModal = false;
   this.router.navigate(["/consultation/liste"]);

  }


  onUpdateRendezVous(updatedRdv: RendezVousDto, idRdv:any){

    this.rendezVousSerive.updateRendezVous(updatedRdv,idRdv).subscribe(
      (element: RendezVousDto) => {
        console.log(element);


      }
    )

    this.getRendezVous();
    this.modifierRdvModal = false;



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
