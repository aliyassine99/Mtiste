import { Component, OnInit, ViewChild } from '@angular/core';


import {ConfirmationService} from 'primeng/api';
import {Message} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, NgForm } from '@angular/forms';
import { Patient } from 'src/app/patients/Patient';
import { PatientsService } from 'src/app/patients/patients.service';
import { Employee } from 'src/app/patients/Employee';
import { FactureDto } from 'src/app/modals/FactureDto';
import { FactureServiceService } from '../facture-service.service';
@Component({
  selector: 'app-liste-factures',
  templateUrl: './liste-factures.component.html',
  styles: [`
  :host ::ng-deep button {
      margin-right: .25em;
  }
`],
providers: [ConfirmationService],
})
export class ListeFacturesComponent implements OnInit {

  employees: Employee[];
  msgs: Message[] = [];
  form: FormGroup;
  closeResult = '';
  editFacture: FactureDto;
  modifierFactureModal: boolean;
  showDetailFacture: boolean;
  displayModal: boolean;
  term: any;



  @ViewChild("editFactureForm") editFactureForm: NgForm;

  position: string;

  factures: FactureDto[] = [];


  constructor(private factureService: FactureServiceService,private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig,private modalService: NgbModal,private patientService: PatientsService) {}

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.getFactures();



  }

  confirm1(idFacture: any) {
      this.confirmationService.confirm({
          message: 'Êtes-vous sûr de vouloir continuer ?',
          header: 'Confirmation',
          acceptLabel:"Oui",
          rejectLabel:"Non",
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.factureService.deleteFacture(idFacture).subscribe(
              (response) =>{
                console.log(response);
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

  showModfierFactureModal(facture: FactureDto){
    this.editFacture= facture;
    this.modifierFactureModal= true;
    this.showDetailFacture= false;
    console.log(this.editFacture.montant);



  }
  onUpdateEmloyee(patient: Patient){

  }

  showDetailFactureModal(){
    this.modifierFactureModal=false;
    this.showDetailFacture= true;
  }

  onSubmitConsultationForm(facture:FactureDto, idFacture: any){
    console.log(facture);
    this.factureService.updateFacture(facture,idFacture).subscribe(
      (response)=> {
        console.log(response);
      }
    );
    this.modifierFactureModal = false;
  }

  getFactures(){
      this.factureService.getFactures().subscribe(
        (response: FactureDto[]) =>{
          this.factures = response;
        }
      );
  }


}
