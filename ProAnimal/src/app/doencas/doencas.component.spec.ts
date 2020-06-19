import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoencasComponent } from './doencas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatIconModule, MatDatepickerModule, MatSnackBarModule, MatTableModule } from '@angular/material';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('DoencasComponent', () => {
  let component: DoencasComponent;
  let fixture: ComponentFixture<DoencasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoencasComponent ],
      imports:[ReactiveFormsModule,
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
    fixture = TestBed.createComponent(DoencasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
