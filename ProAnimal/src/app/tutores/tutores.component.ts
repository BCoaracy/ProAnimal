import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { iTutores } from '../models/tutores.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { PersonaService } from '../services/persona.service'

@Component({
  selector: 'app-tutores',
  templateUrl: './tutores.component.html',
  styleUrls: ['./tutores.component.css']
})
export class TutoresComponent implements OnInit {

  tutores$: Observable<iTutores[]>;
  filteredOptions: Observable<string[]>;

  maskCpf = [/\d/, /\d/,/\d/, '.', /\d/, /\d/,/\d/, '.', /\d/, /\d/, /\d/,'.', '-', /\d/,/\d/,];


  tutorForm = this.fb.group({
    Id: [undefined],
    Cpf: ['', [Validators.required]],
    Nome: ['', [Validators.required]],
    Bloqueado: [false, [Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private pService: PersonaService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    let t: iTutores = this.tutorForm.value;
    if (!t.Id) {
      this.addTutor(t);
    } else {
      this.updateTutor(t);
    }
  }

  addTutor(t: iTutores) {
    console.log('No addTutor: ' + t);
    this.pService.addTutor(t)
      .then(() => {
        this.snackBar.open('Tutor Adicionado.', 'OK', { duration: 2500 })
        this.tutorForm.reset({ Nome: '', CPF: '', Bloqueado: false });
      })
      .catch(() => {
        this.snackBar.open('Erro ao submeter o Tutor')
      })
  }

  updateTutor(t: iTutores) {
    if (t.Bloqueado == true) {
      t.DataBloqueio = Date().valueOf();
    }
    this.pService.update(t)
      .then(() => {
        this.snackBar.open('Edição Completa.', 'OK', { duration: 2500 })
        this.tutorForm.reset({ Nome: '', CPF: '', Bloqueado: false });
      })
      .catch(() => {
        this.snackBar.open('Erro ao submeter o Tutor')
      })
  }

  filter(event) {
    console.log('teste')
    this.tutores$ = this.pService.searchTutorByCpf(event.target.value)

    this.tutores$.subscribe(rec => {
      console.log(rec)
    })
    //this.filteredOptions = this.tutores$.
    // this.filteredOptions = this.myControl.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => this._filter(value))
    //   );
  }

  updateForm(cpf: string) {
    this.pService.searchTutorByCpf(cpf).subscribe(
      rec => {
        this.tutorForm.controls['Id'].patchValue(rec[0].Id);
        this.tutorForm.controls['Cpf'].patchValue(rec[0].Cpf);
        this.tutorForm.controls['Nome'].patchValue(rec[0].Nome);
        this.tutorForm.controls['Bloqueado'].patchValue(rec[0].Bloqueado);
      }
    )
  }

}
