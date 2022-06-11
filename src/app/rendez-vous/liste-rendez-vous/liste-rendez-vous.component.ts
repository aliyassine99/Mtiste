
import { Component } from '@angular/core';
import { EventApi } from '@fullcalendar/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, Message, PrimeNGConfig } from 'primeng/api';

import { RendezVous } from '../RendezVous';


@Component({
  selector: 'app-liste-rendez-vous',
  templateUrl: './liste-rendez-vous.component.html',
  styles: [`
  :host ::ng-deep button {
      margin-right: .25em;
  }
`],
providers: [ConfirmationService],
})
export class ListeRendezVousComponent  {


  currentEvents: EventApi[] = [];

  newEv: RendezVous[]= [];

  msgs: Message[] = [];
  closeResult = '';
  ticket:string;



  position: string;
  options: any;





  constructor(private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig,private modalService: NgbModal) {}

  ngOnInit() {

    this.newEv = [{
      title: "Samuel",
      date: new Date("2022-06-11T03:00")
    },{
      title: "Lauri",
      date: new Date("2022-06-11T13:00")
    },{
      title: "May",
      date: new Date("2022-06-11T23:00")
    },{
      title: "Tressy",
      date: new Date("2022-06-12T14:36")


    }]
    this.primengConfig.ripple = true;
     this.options = {
                initialDate : new Date(),

                events: [] = this.newEv,

                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                },
                editable: true,
                selectable:true,
                selectMirror: true,
                dayMaxEvents: true,


        };


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


handleEvents(events: EventApi[]) {
  this.currentEvents = events;
}








  }




