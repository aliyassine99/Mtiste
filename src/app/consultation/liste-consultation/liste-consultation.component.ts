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

  editedConsultation: ConsultationDto;

  consultationId: any;
  @ViewChild("ordonnanceForm") ordonnanceForm: NgForm;



  term: any;
  position: string;

  consultations: ConsultationDto[] = [
    {
      id:1,
     description: "Simple",
      rendezVous:
      { dateRdv:"22-09-2022",
      heureRdv: "09:23",
        patient:{nomComplet:"Ali"}} },

        {
          id:2,
         description: "Simple",
          rendezVous:
          { dateRdv:"12-12-2022",
          heureRdv: "09:23",
            patient:{nomComplet:"Sami"}} },
            {
              id:3,
             description: "James",
              rendezVous:
              { dateRdv:"05-05-2022",
              heureRdv: "09:23",
                patient:{nomComplet:"Loucy"}} },

  ];


  constructor(private formBuilder: FormBuilder ,private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig,private modalService: NgbModal,private patientService: PatientsService) {}

  ngOnInit() {
    this.primengConfig.ripple = true;



  }

  confirm1() {
      this.confirmationService.confirm({
          message: 'Êtes-vous sûr de vouloir continuer ?',
          header: 'Confirmation',
          acceptLabel:"Oui",
          rejectLabel:"Non",
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
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

  showDetailRdvModal(){

    this.modifierConsultationModal= false;
    this.ordonnanceModal= false;

    this.plusDetailRdvModal= true;


  }
  onUpdateEmloyee(patient: Patient){

  }

  onSubmitConsultationForm(updatedConsultation: ConsultationDto){

    console.log(updatedConsultation);
  }



}
