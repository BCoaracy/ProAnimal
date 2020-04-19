import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { iAgenda } from '../models/agenda.model';
import { Observable } from 'rxjs';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.component.html',
  styleUrls: ['./agendamentos.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AgendamentosComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) { }

  animal$: Observable<iAgenda[]>;
  form: FormGroup;
  dataMin = new Date();



  configForm() {
    this.form = this.fb.group({
      AnimalChip: new FormControl(['', [Validators.required]]),
      DataAgendada: new FormControl([this.dataMin]),
      DataAgendamento: new FormControl(['', [Validators.required]]),
      ProcedimentoRealizado: new FormControl(['', [Validators.required]]),
      Bloquear: new FormControl(['', [Validators.required]]),
      TecnicoResponsavel: new FormControl(['', [Validators.required]])
    })
  }

  ngOnInit() {
    this.configForm();
  }

  dateClass = (d: Date): MatCalendarCellCssClasses => {
    const date = d.getDate();

    // Highlight the 1st and 20th day of each month.
    return (date === 1 || date === 20) ? 'date-class' : '';
  }
}
