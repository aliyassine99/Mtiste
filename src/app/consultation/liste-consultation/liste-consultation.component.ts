import { Component, OnInit, ViewChild } from '@angular/core';


import {ConfirmationService} from 'primeng/api';
import {Message} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Patient } from 'src/app/patients/Patient';
import { PatientsService } from 'src/app/patients/patients.service';
import { Employee } from 'src/app/patients/Employee';
import { RendezVousDto } from 'src/app/modals/RendezVousDto';
import { OrdonnanceDto } from 'src/app/modals/OrdonnanceDto';
import { ConsultationDto } from 'src/app/modals/ConsulationDto';
import { ConsultationService } from '../consultation.service';
import { OrdonnanceService } from 'src/app/ordonnance/ordonnance.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-liste-consultation',
  templateUrl: './liste-consultation.component.html',
  styles: [`
  :host ::ng-deep button {
      margin-right: .25em;
  }
`],
providers: [ConfirmationService],
})
export class ListeConsultationComponent implements OnInit {


  msgs: Message[] = [];
  form: FormGroup;
  closeResult = '';
  editRendezVous: RendezVousDto;
  modifierConsultationModal: boolean;
  ordonnanceModal: boolean;
  plusDetailRdvModal: boolean;
  consultationMoreDetails: ConsultationDto;

  editedConsultation: ConsultationDto;

  consultationId: any;
  @ViewChild("ordonnanceForm") ordonnanceForm: NgForm;



  term: any;
  position: string;

  consultations: ConsultationDto[] = [];


  constructor(private router: Router,private consultationService: ConsultationService,private formBuilder: FormBuilder ,private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig,private modalService: NgbModal,private patientService: PatientsService) {}

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.consultationService.getConsultation().subscribe(
      (response: ConsultationDto[])=>{
        this.consultations = response;
      }
    );



  }

  confirm1(deleteConsultationId: any) {
      this.confirmationService.confirm({
          message: 'Êtes-vous sûr de vouloir continuer ?',
          header: 'Confirmation',
          acceptLabel:"Oui",
          rejectLabel:"Non",
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.consultationService.deleteConsultation(deleteConsultationId).subscribe(
              (element: ConsultationDto)=>{
                console.log(element);
                this.consultations;
              }
            );
              this.msgs = [{severity:'success', summary:'Confirmé', detail:'Les données bien supprimé'}];
          },
          reject: () => {
              this.msgs = [{severity:'info', summary:'Annulé', detail:'Vous avez rejeté votre operation'}];
          }
      });
  }

  open(rendezVous:RendezVousDto,content:any) {
    this.editRendezVous= rendezVous;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.editRendezVous= rendezVous;
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

  showModfierConsultationModal(consultation: ConsultationDto){

    this.modifierConsultationModal= true;
    this.ordonnanceModal= false;
    this.plusDetailRdvModal= false;

    this.editedConsultation = consultation;



  }



  showOrdonnaceModal(consultation: ConsultationDto){

    this.modifierConsultationModal= false;

    this.ordonnanceModal=true;
    this.plusDetailRdvModal= false;
    this.consultationId = consultation.id;




  }

  showDetailRdvModal(consultation: ConsultationDto){

    this.modifierConsultationModal= false;
    this.ordonnanceModal= false;

    this.plusDetailRdvModal= true;
    this.consultationMoreDetails = consultation;


  }
  onUpdateEmloyee(patient: Patient){

  }

  onSubmitConsultationForm(updatedConsultation: ConsultationDto, cosultationEditId: any){

    this.consultationService.updateConsultatio(updatedConsultation,cosultationEditId).subscribe(
      (element: ConsultationDto)=>{
        console.log(element);
        this.consultations;
      }
    )
    this.modifierConsultationModal= false;
  }


  onAddConsultation(consultation: ConsultationDto){

    const ordonnanceForm: ConsultationDto ={

      "id": this.ordonnanceForm.value.rendezVousId,
      "ordonnance":{"description": this.ordonnanceForm.value.description}

    }

    this.consultationService.addOrdonnance(ordonnanceForm).subscribe(
      (response: ConsultationDto)=>{
        console.log(response);
      }

    )

    this.ordonnanceModal = false;
    this.router.navigate(["/ordonnance/liste-ordonnance"]);


  }



}
