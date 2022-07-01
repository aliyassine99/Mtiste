
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventApi } from '@fullcalendar/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, Message, PrimeNGConfig } from 'primeng/api';
import { RendezVousDto } from 'src/app/modals/RendezVousDto';
import { DisplayRdv } from '../DisplayRdv';
import { RendezVousService } from '../rendez-vous.service';

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

  newEv: RendezVousDto[]= [];
  oldEve: RendezVousDto[]= [];

  newEvents: DisplayRdv[]= [];
  msgs: Message[] = [];
  closeResult = '';
  ticket:string;



  position: string;
  options: any;





  constructor(private router: Router,private httpClient: HttpClient,private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig,private modalService: NgbModal,private rendezVousService: RendezVousService) {}



  ngOnInit() {

   this.rendezVousService.getRendezVous().subscribe(
    (response: RendezVousDto[]) =>{

      this.newEv = response;
      console.log(this.newEv);
      for(let i =0;i< this.newEv.length ; i++){

        console.log(this.newEv[i].dateVisite+" "+this.newEv[i].heureVisite);
        const date = this.newEv[i].dateVisite+" "+this.newEv[i].heureVisite;
        const patient= this.newEv[i].patient?.nomPrenom;
       this.newEvents.push({

        date: new Date(date),
        title: patient
       })
       }

       this.options = {
        initialDate : new Date(),

        events: [] = this.newEvents,

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
   );



   console.log("dates " +this.newEvents);







   this.oldEve = [{



    }]
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


handleEvents(events: EventApi[]) {
  this.currentEvents = events;
}








  }




