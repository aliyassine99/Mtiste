import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-consultation',
  templateUrl: './liste-consultation.component.html',
  styleUrls: ['./liste-consultation.component.scss']
})
export class ListeConsultationComponent implements OnInit {

  constructor() { }

  public displayModal: boolean;
  ngOnInit(): void {
  }


  showModalDialog() {
    this.displayModal = true;
}
}
