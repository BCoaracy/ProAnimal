import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatCalendarCellCssClasses, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { iAgenda } from '../models/agenda.model';
import { Observable } from 'rxjs';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar, MAT_DATE_LOCALE } from '@angular/material';
import { AgendamentoService } from '../services/agendamento.service';
import { type } from 'os';


@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.component.html',
  styleUrls: ['./agendamentos.component.css'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
  encapsulation: ViewEncapsulation.None,
})
export class AgendamentosComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private aService: AgendamentoService
  ) { }

  agenda$: Observable<iAgenda>;
  form: FormGroup;
  dataMin = new Date();
  horariosLivres = [{ hora: '07:00', valida: true }, { hora: '08:00', valida: true }, { hora: '09:00', valida: true }, { hora: '10:00', valida: true },
  { hora: '11:00', valida: true }, { hora: '12:00', valida: true }, { hora: '13:00', valida: true }, { hora: '14:00', valida: true },
  { hora: '15:00', valida: true }, { hora: '16:00', valida: true }, { hora: '17:00', valida: true }, { hora: '18:00', valida: true }]


  configForm() {
    this.form = this.fb.group({
      Id: new FormControl(undefined),
      AnimalChip: new FormControl(undefined),
      DataAgendada: new FormControl('', [Validators.required]),
      HoraAgendada: new FormControl('', [Validators.required]),
      DataAgendamento: new FormControl(undefined),
      ProcedimentoRealizado: new FormControl(false),
      Bloquear: new FormControl(false),
      TecnicoResponsavel: new FormControl(undefined)
    })
  }

  ngOnInit() {
    this.configForm();

  }

  filtroDiasSemana = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  }

  getDataAgendada(event: MatDatepickerInputEvent<Date>) {
    this.form.controls['DataAgendada'].patchValue(event.value.toISOString().slice(0, 10));
    this.definirHorariosLivres(this.aService.getAgendamentosData(this.form.controls['DataAgendada'].value));
  }

  definirHorariosLivres(DataFiltrada: Observable<iAgenda[]>) {
    DataFiltrada.subscribe(rec => {
      for (let x in rec) {
        for (let i in this.horariosLivres) {
          console.log("Hora agendada: " + rec[x].HoraAgendada + "Horario Livre: " + this.horariosLivres[i].hora)
          if (rec[x].HoraAgendada == this.horariosLivres[i].hora) {
            this.horariosLivres[i].valida = false;
          }
        }
      }
    })
    console.log(this.horariosLivres)
  }


  onSubmit() {
    let a: iAgenda = this.form.value;
    console.log(a)

    if (!a.Id) {
      this.addAgendamento(a);
    } else {

    }
  }

  addAgendamento(a: iAgenda) {
    this.aService.createOrUpdate(this.form.value)
      .then(() => {
        this.snackBar.open('Agendamento Concluido.', 'OK', { duration: 2500 })
        this.form.reset();
      })
      .catch(() => {
        this.snackBar.open('Erro ao submeter o Tutor')
      })
  }



}
