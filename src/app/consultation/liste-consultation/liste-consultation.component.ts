import { Component, OnInit } from '@angular/core';


import {ConfirmationService} from 'primeng/api';
import {Message} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  employees: Employee[];
  msgs: Message[] = [];
  form: FormGroup;
  closeResult = '';
  editRendezVous: RendezVousDto;
  modifierRdvModal: boolean;
  consultationModal: boolean;
  ordonnanceModal: boolean;
  plusDetailRdvModal: boolean;
  addOrdonnance: OrdonnanceDto;
  rendezVousID: any;
  ordonnanceForm: FormGroup;
  term: any;


  position: string;

  rendezVous: RendezVousDto[] = [
    {
      dateRdv: "12-03-2022",
      heureRdv: "09:00",
      patient: {nomComplet: "Marc Shut"}





    },
    {
      dateRdv: "12-03-2022",
      heureRdv: "09:00",
      patient: {nomComplet: "Sanuel Tadey"}





    },
    {
      dateRdv: "12-03-2022",
      heureRdv: "09:00",
      patient: {nomComplet: "Sam dee"}





    }
  ];


  constructor(private formBuilder: FormBuilder ,private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig,private modalService: NgbModal,private patientService: PatientsService) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.patientService.getEmployees().subscribe(element=>{
      this.employees = element;
    })

    this.ordonnanceForm = this.formBuilder.group({
      description: new FormControl("description",[Validators.required]),
      rendezVous: new FormControl("rendezVous")
    });


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

  showModfierRdvModal(){

    this.modifierRdvModal= true;
    this.consultationModal= false;
    this.ordonnanceModal=false;
    this.plusDetailRdvModal= false;


  }

  showConsultationModal(){

    this.modifierRdvModal= false;
    this.consultationModal= true;
    this.ordonnanceModal=false;
    this.plusDetailRdvModal= false;


  }

  showOrdonnaceModal(rendezVous: RendezVousDto){

    this.modifierRdvModal= false;
    this.consultationModal= false;
    this.ordonnanceModal=true;
    this.plusDetailRdvModal= false;
    this.editRendezVous = rendezVous;




  }

  showDetailRdvModal(){

    this.modifierRdvModal= false;
    this.consultationModal= false;
    this.ordonnanceModal=false;
    this.plusDetailRdvModal= true;


  }
  onUpdateEmloyee(patient: Patient){

  }

  onSubmitConsultationForm(){

    const saveConsultation: ConsultationDto = {
      description: this.ordonnanceForm.controls["description"].value,

    }

    console.log(saveConsultation);
  }



}
