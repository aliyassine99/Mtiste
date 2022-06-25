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
import { ConsultationDto } from 'src/app/modals/ConsulationDto';

@Component({
  selector: 'app-table-rdv',
  templateUrl: './table-rdv.component.html',
  styles: [`
  :host ::ng-deep button {
      margin-right: .25em;
  }
`],
providers: [ConfirmationService],
})
export class TableRdvComponent implements OnInit {

  employees: Employee[];
  msgs: Message[] = [];
  form: FormGroup;
  consultationForm: FormGroup;
  closeResult = '';
  editPatient: Patient;
  modifierRdvModal: boolean;
  consultationModal: boolean;

  plusDetailRdvModal: boolean;
  term: any;

  @ViewChild("saveConsultationForm") saveConsultationForm: NgForm;

  selectedOne:any = "jbac ";


  position: string;

  rendezVous: RendezVousDto[] = [
    {
      id:1,
      dateRdv: "12-03-2022",
      heureRdv: "09:00",
      patient: {nomComplet: "Marc Shut"}





    },
    {
      id:2,
      dateRdv: "12-03-2022",
      heureRdv: "09:00",
      patient: {nomComplet: "Sanuel Tadey"}





    },
    {
      id:3,
      dateRdv: "12-03-2022",
      heureRdv: "09:00",
      patient: {nomComplet: "Sam dee"}





    }
  ];


  constructor(private formBuilder: FormBuilder,private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig,private modalService: NgbModal,private patientService: PatientsService) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.patientService.getEmployees().subscribe(element=>{
      this.employees = element;
    })


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

  showModfierRdvModal(){

    this.modifierRdvModal= true;
    this.consultationModal= false;

    this.plusDetailRdvModal= false;


  }

  showConsultationModal(rdv: RendezVousDto){

    this.modifierRdvModal= false;
    this.consultationModal= true;

    this.plusDetailRdvModal= false;

    this.selectedOne= rdv.id;


  }


  showDetailRdvModal(){

    this.modifierRdvModal= false;
    this.consultationModal= false;

    this.plusDetailRdvModal= true;


  }
  onUpdateEmloyee(patient: Patient){

  }

  onSubmitConsultationForm(){


    const consultation: ConsultationDto ={
      description: this.saveConsultationForm.value.description,
      rendezVous: {id: this.saveConsultationForm.value.rdv}
    }

    console.log(consultation);
  }



}
