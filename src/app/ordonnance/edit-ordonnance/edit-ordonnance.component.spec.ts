import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrdonnanceComponent } from './edit-ordonnance.component';

describe('EditOrdonnanceComponent', () => {
  let component: EditOrdonnanceComponent;
  let fixture: ComponentFixture<EditOrdonnanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOrdonnanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrdonnanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
