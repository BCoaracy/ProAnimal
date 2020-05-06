import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { iTutores } from '../models/tutores.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MatSnackBar, ErrorStateMatcher } from '@angular/material';
import { PersonaService } from '../services/persona.service'
import { formatCurrency } from '@angular/common';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-tutores',
  templateUrl: './tutores.component.html',
  styleUrls: ['./tutores.component.css']
})
export class TutoresComponent implements OnInit {

  tutores$: Observable<iTutores[]>;
  filteredOptions: Observable<string[]>;
  btnSalvar = false;

  maskCpf = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];


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
      console.log("adicionando!")
    } else {
      this.updateTutor(t);
      console.log("updatando!")
    }
  }

  addTutor(t: iTutores) {
    console.log('No addTutor: ');

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
    } else {
      t.DataBloqueio = null;
    }
    this.pService.update(t)
      .then(() => {
        this.snackBar.open('Edição Completa.', 'OK', { duration: 2500 })
        //this.tutorForm.reset({ Nome: '', CPF: '', Bloqueado: false });
        this.tutorForm.reset();
      })
      .catch(() => {
        this.snackBar.open('Erro ao submeter o Tutor')
      })
  }

  filter(cpf: string) {
    console.log('teste')
    this.tutores$ = this.pService.searchTutorByCpf(cpf)
    this.atualizarFormularioTutorEncontrado()
    this.tutores$.subscribe(rec => {
      console.log(rec)
    })
  }

  updateForm(event) {
    if (this.validarCpf(event.target.value)) {
      this.filter(event.target.value);
      this.btnSalvar = true;
      console.log("Cpf ok");
    } else {
      console.log("Cpf incorreto");
      this.btnSalvar = false;
    }
  }

  validarCpf(cpf: string): Boolean {
    let Soma;
    let Resto;
    Soma = 0;
    //strCPF  = RetiraCaracteresInvalidos(strCPF,11);
    if (cpf == "00000000000")
      return false;
    for (let i = 1; i <= 9; i++)
      Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;
    if ((Resto == 10) || (Resto == 11))
      Resto = 0;
    if (Resto != parseInt(cpf.substring(9, 10)))
      return false;
    Soma = 0;
    for (let i = 1; i <= 10; i++)
      Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
    if ((Resto == 10) || (Resto == 11))
      Resto = 0;
    if (Resto != parseInt(cpf.substring(10, 11)))
      return false;
    return true;

  }

  atualizarFormularioTutorEncontrado() {
    this.tutores$.subscribe(
      rec => {
        this.tutorForm.controls['Id'].patchValue(rec[0].Id);
        this.tutorForm.controls['Cpf'].patchValue(rec[0].Cpf);
        this.tutorForm.controls['Nome'].patchValue(rec[0].Nome);
        this.tutorForm.controls['Bloqueado'].patchValue(rec[0].Bloqueado);
      }
    )
  }

  imprimeObservable(o: Observable<iTutores>) {
    o.subscribe(rec => {
      console.log(rec)
    })
  }

}
