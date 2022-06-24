import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRdvComponent } from './table-rdv.component';

describe('TableRdvComponent', () => {
  let component: TableRdvComponent;
  let fixture: ComponentFixture<TableRdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableRdvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableRdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
