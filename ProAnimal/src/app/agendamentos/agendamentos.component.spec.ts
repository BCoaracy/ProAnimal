//import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AgendamentosComponent } from './agendamentos.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AngularFirestoreModule } from 'angularfire2/firestore';
//import { AngularFireDatabaseModule } from 'angularfire'
import { AgendamentoService } from '../services/agendamento.service';

describe('AgendamentosComponent', () => {
  let component: AgendamentosComponent;
  let fixture: ComponentFixture<AgendamentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [AgendamentoService],
      declarations: [AgendamentosComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatDatepickerModule,
        MatSnackBarModule,
        AngularFirestoreModule,
        //AngularFireDatabaseModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('Cria um agendamneto', () => {
  //   spyOn(component.aService, 'createOrUpdate');
  //   // Note: if you want to spy on it and you want it to get called for real
  //   // you should do following
  //   // spyOn(component.myService, 'getAwesomeStuff').and.callThrough();
  //   // or return fake output
  //   // spyOn(component.myService, 'getAwesomeStuff')
  //   //        .and.callFake((arguments, can, be, received) =>  {
  //   //                          return fake;
  //   //                      });
  //   component.addAgendamento();
  //   expect(component.aService.createOrUpdate).toHaveBeenCalled();
  // });
});
