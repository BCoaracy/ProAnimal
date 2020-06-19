import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacinasComponent } from './vacinas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatIconModule, MatDatepickerModule, MatSnackBarModule, MatTableModule } from '@angular/material';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('VacinasComponent', () => {
  let component: VacinasComponent;
  let fixture: ComponentFixture<VacinasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VacinasComponent],
      imports: [ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatDatepickerModule,
        MatSnackBarModule,
        AngularFirestoreModule,
        MatTableModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
