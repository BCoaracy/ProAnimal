import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimaisComponent } from './animais.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatIconModule, MatDatepickerModule, MatSnackBarModule, MatTableModule } from '@angular/material';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AnimaisComponent', () => {
  let component: AnimaisComponent;
  let fixture: ComponentFixture<AnimaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnimaisComponent],
      imports: [ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatDatepickerModule,
        MatSnackBarModule,
        AngularFirestoreModule,
        MatTableModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
