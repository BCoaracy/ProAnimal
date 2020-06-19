import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinariosComponent } from './veterinarios.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatIconModule, MatDatepickerModule, MatSnackBarModule } from '@angular/material';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('VeterinariosComponent', () => {
  let component: VeterinariosComponent;
  let fixture: ComponentFixture<VeterinariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VeterinariosComponent],
      imports: [ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatDatepickerModule,
        MatSnackBarModule,
        AngularFirestoreModule,],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeterinariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
