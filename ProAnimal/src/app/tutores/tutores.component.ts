import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { iTutores } from '../models/tutores.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MatSnackBar, ErrorStateMatcher, MatDatepickerInputEvent } from '@angular/material';
import { PersonaService } from '../services/persona.service'
import { formatCurrency } from '@angular/common';
import { iVeterinario } from '../models/veterinario.model';
import { iEndereco } from '../models/endereco.model';

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
    Bloqueado: [false, [Validators.required]],
    DataNasc: ['', [Validators.required]]
  })
  vetForm = this.fb.group({
    Id: [undefined],
    Cpf: ['', [Validators.required]],
    crmv: ['', [Validators.required]],
    Nome: ['', [Validators.required]],
    DataNasc: ['', [Validators.required]],
    Clinica: ['']
  })

  enderecoForm = this.fb.group({
    cpf: [''],
    Bairro: ['', Validators.required],
    Logradouro: ['', Validators.required],
    Numero: ['', Validators.required],
    Complemento: ['']
  })

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private pService: PersonaService
  ) { }

  ngOnInit() {

  }

  onSubmit() {
    if (this.tutorForm.valid == true) {
      let t: iTutores = this.tutorForm.value;
      if (!t.Id) {
        this.addTutor(t);
        console.log("adicionando!")
      } else {
        this.updateTutor(t);
        console.log("updatando!")
      }
    } else {
      let v: iVeterinario = this.vetForm.value;
      if (!v.Id) {
        this.addVet(v);
        console.log("adicionando!")
      } else {
        this.updateVet(v);
        console.log("updatando!")
      }
    }
  }

  addTutor(t: iTutores) {
    console.log('No addTutor: ');
    console.log(t);

    this.pService.addTutor(t)
      .then(() => {
        this.addEndereco(t.Cpf);
        this.snackBar.open('Tutor Adicionado.', 'OK', { duration: 2500 })
        this.tutorForm.reset({ Nome: '', CPF: '', Bloqueado: false });
        this.enderecoForm.reset();
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
        this.updateEndereco
        this.snackBar.open('Dados Atualizados.', 'OK', { duration: 2500 })
        this.tutorForm.reset();
        this.enderecoForm.reset();
      })
      .catch(() => {
        this.snackBar.open('Erro ao submeter o Tutor')
      })
    this.updateEndereco();
  }
  addVet(v: iVeterinario) {
    console.log('No addVet: ');

    this.pService.addVeterinario(v)
      .then(() => {
        this.addEndereco(v.Cpf)
        this.snackBar.open('Veterinario Adicionado.', 'OK', { duration: 2500 })
        this.vetForm.reset();
        this.enderecoForm.reset();
      })
      .catch(() => {
        this.snackBar.open('Erro ao submeter o Veterinario')
      })
  }

  updateVet(v: iVeterinario) {
    this.pService.updateVeterinario(v)
      .then(() => {
        this.updateEndereco();
        this.snackBar.open('Dados Atualizados.', 'OK', { duration: 2500 })
        this.tutorForm.reset();
        this.enderecoForm.reset();
      })
      .catch(() => {
        this.snackBar.open('Erro ao submeter o Veterinário')
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
      this.getEnderecoForm(event.target.value);
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
    if (Resto != parseInt(cpf.substring(9, 10))) {
      // this.snackBar.open('Número do cpf incorreto!', 'OK', { duration: 3000 })
      return false;
    }
    Soma = 0;
    for (let i = 1; i <= 10; i++)
      Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
    if ((Resto == 10) || (Resto == 11))
      Resto = 0;
    if (Resto != parseInt(cpf.substring(10, 11))) {
      this.snackBar.open('Número do cpf incorreto!', 'OK', { duration: 3000 })
      return false;
    }
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

  addEndereco(cpf: string) {
    let end: iEndereco = this.enderecoForm.value;
    end.cpf = cpf;
    this.pService.addEndereco(end);
  }

  updateEndereco() {
    let end: iEndereco = this.enderecoForm.value;
    this.pService.updateEndereco(end);
  }

  getEnderecoForm(cpf: string) {
    let end: Observable<iEndereco[]> = this.pService.getEndereco(cpf)
    end.subscribe(rec => {
      this.enderecoForm.controls['cpf'].patchValue(rec[0].cpf)
      this.enderecoForm.controls['Bairro'].patchValue(rec[0].Bairro)
      this.enderecoForm.controls['Logradouro'].patchValue(rec[0].Logradouro)
      this.enderecoForm.controls['Numero'].patchValue(rec[0].Numero)
      this.enderecoForm.controls['Complemento'].patchValue(rec[0].Complemento)
    })
  }

  getDataNasc(event: MatDatepickerInputEvent<Date>, entidade: string) {
    console.log('teste data', entidade)
    if (entidade == 'tutor') {
      this.tutorForm.controls['DataNasc'].patchValue(event.value.toISOString().slice(0, 10));
      console.log(event.target.value);
      console.log(this.tutorForm.controls['DataNasc'].value);
    } else {
      this.vetForm.controls['DataNasc'].patchValue(event.value.toISOString().slice(0, 10));
      console.log(this.vetForm.controls['DataNasc'].value);
    }
  }

  imprimeObservable(o: Observable<iTutores>) {
    o.subscribe(rec => {
      console.log(rec)
    })
  }

}
