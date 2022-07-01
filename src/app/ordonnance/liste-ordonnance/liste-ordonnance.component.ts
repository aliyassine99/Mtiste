import { Component, OnInit, ViewChild } from '@angular/core';


import {ConfirmationService} from 'primeng/api';
import {Message} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, NgForm } from '@angular/forms';
import { Patient } from 'src/app/patients/Patient';
import { PatientsService } from 'src/app/patients/patients.service';
import { Employee } from 'src/app/patients/Employee';
import { OrdonnanceDto } from 'src/app/modals/OrdonnanceDto';
import { OrdonnanceService } from '../ordonnance.service';


@Component({
  selector: 'app-liste-ordonnance',
  templateUrl: './liste-ordonnance.component.html', styles: [`
  :host ::ng-deep button {
      margin-right: .25em;
  }
`],
providers: [ConfirmationService],
})
export class ListeOrdonnanceComponent implements OnInit {

  employees: Employee[];
  msgs: Message[] = [];
  form: FormGroup;
  closeResult = '';
  editOrdonnance: OrdonnanceDto;
  showDetailDialog: boolean;
  displayModal: boolean;
  term: any;

  ordonnanceMoreDetail: OrdonnanceDto;

  @ViewChild("editOrdonnanceForm") editOrdonnanceForm: NgForm;


  position: string;

  ordonnances: OrdonnanceDto[] = [

  ];


  constructor(private ordonnanceService:OrdonnanceService, private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig,private modalService: NgbModal,private patientService: PatientsService) {}

  ngOnInit() {

    console.log(this.ordonnances);
    this.primengConfig.ripple = true;

    this.ordonnanceService.getOrdonnances().subscribe(
      (response: OrdonnanceDto[]) => {
       this.ordonnances = response;
       console.log(response);
      }
    )



  }

  confirm1(ordonnanceId: any) {
      this.confirmationService.confirm({
          message: 'Êtes-vous sûr de vouloir continuer ?',
          header: 'Confirmation',
          acceptLabel:"Oui",
          rejectLabel:"Non",
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.ordonnanceService.deleteOrdonnance(ordonnanceId).subscribe(
              (element)=>{
                console.log(element);
              }
            );
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

  showEditOrdonnanceModal(ordonnance: OrdonnanceDto){
    this.editOrdonnance= ordonnance;
    this.displayModal= true;
    this.showDetailDialog= false;


  }
  onUpdateEmloyee(patient: Patient){

  }

  showDetailPopUp(ordonnance: OrdonnanceDto){
    this.displayModal=false;
    this.showDetailDialog= true;
    this.ordonnanceMoreDetail = ordonnance;
  }

  onUpdateOrdonnance(ordonnance: OrdonnanceDto, ordonnanceId: any){
    this.ordonnanceService.updateOrdonnace(ordonnance,ordonnanceId).subscribe(
      (response: OrdonnanceDto)=>{
        console.log(response);
      }
    );
  }

}
