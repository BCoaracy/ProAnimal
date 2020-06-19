import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutoresComponent } from './tutores.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatIconModule, MatDatepickerModule, MatSnackBarModule, MatTableModule } from '@angular/material';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TutoresComponent', () => {
  let component: TutoresComponent;
  let fixture: ComponentFixture<TutoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutoresComponent ],
      imports:[ReactiveFormsModule,
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
    fixture = TestBed.createComponent(TutoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
