import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoComponent } from './historico.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatIconModule, MatDatepickerModule, MatSnackBarModule, MatTableModule } from '@angular/material';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('HistoricoComponent', () => {
  let component: HistoricoComponent;
  let fixture: ComponentFixture<HistoricoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HistoricoComponent],
      imports: [ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatDatepickerModule,
        MatSnackBarModule,
        AngularFirestoreModule,
        MatTableModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
