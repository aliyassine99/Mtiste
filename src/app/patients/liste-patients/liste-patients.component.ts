import { Component, OnInit } from '@angular/core';

import { Patient } from '../Patient';
import {ConfirmationService} from 'primeng/api';
import {Message} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  closeResult = '';

  position: string;

  patients: Patient[] = [
    {
      "cin": "BQ12",
      "nom": "Douglas",
      "prenom": "Pace",
      "dateNaissance": new Date,
      "telephone": 923469828,
      "email": "douglas@gmail"





    },
    {
      "cin": "BQ12",
      "nom": "Douglas",
      "prenom": "Pace",
      "dateNaissance": new Date,
      "telephone": 923469828,
      "email": "douglas@gmail"





    }, {
      "cin": "BQ12",
      "nom": "Douglas",
      "prenom": "Pace",
      "dateNaissance": new Date,
      "telephone": 923469828,
      "email": "douglas@gmail"





    }, {
      "cin": "BQ12",
      "nom": "Douglas",
      "prenom": "Pace",
      "dateNaissance": new Date,
      "telephone": 923469828,
      "email": "douglas@gmail"





    }, {
      "cin": "BQ12",
      "nom": "Douglas",
      "prenom": "Pace",
      "dateNaissance": new Date,
      "telephone": 923469828,
      "email": "douglas@gmail"





    }
  ];


  constructor(private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig,private modalService: NgbModal) {}

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

  open(content:any) {
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


}
