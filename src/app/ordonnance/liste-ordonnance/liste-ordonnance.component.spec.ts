import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeOrdonnanceComponent } from './liste-ordonnance.component';

describe('ListeOrdonnanceComponent', () => {
  let component: ListeOrdonnanceComponent;
  let fixture: ComponentFixture<ListeOrdonnanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeOrdonnanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeOrdonnanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
