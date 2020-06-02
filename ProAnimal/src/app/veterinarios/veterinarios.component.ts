import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { iVeterinario } from '../models/veterinario.model';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatDatepickerInputEvent } from '@angular/material';
import { PersonaService } from '../services/persona.service';
import { iEndereco } from '../models/endereco.model';

@Component({
  selector: 'app-veterinarios',
  templateUrl: './veterinarios.component.html',
  styleUrls: ['./veterinarios.component.css']
})
export class VeterinariosComponent implements OnInit {

  veterinarios$: Observable<iVeterinario[]>;
  filteredOptions: Observable<string[]>;
  btnSalvar = false;

  vetForm = this.fb.group({
    Id: [''],
    cpf: ['', [Validators.required]],
    Crmv: ['', [Validators.required]],
    Nome: ['', [Validators.required]],
    DataNasc: ['', [Validators.required]],
    Clinica: ['']
  })

  enderecoForm = this.fb.group({
    Cpf: [''],
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
    if (this.vetForm.valid == true) {
      let v: iVeterinario = this.vetForm.value;
      if (!v.Id) {
        this.addVet(v);
      } else {
        this.updateVet(v);
      }
    }
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
        this.vetForm.reset();
        this.enderecoForm.reset();
      })
      .catch(() => {
        this.snackBar.open('Erro ao submeter o Veterinário')
      })
  }

  filter(cpf: string) {
    console.log('entrouno filter')
    this.veterinarios$ = this.pService.searchVetByCpf(cpf);
    this.atualizarFormularioVet()
  }

  updateForm(event) {
    if (this.validarCpf(event.target.value)) {
      this.filter(event.target.value);
      this.getEnderecoForm(event.target.value);
      this.btnSalvar = true;
    } else {
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

  atualizarFormularioVet() {
    this.veterinarios$.subscribe(
      rec => {
        console.log(rec[0]);
        this.vetForm.controls['Id'].patchValue(rec[0].Id);
        this.vetForm.controls['Nome'].patchValue(rec[0].Nome);
        this.vetForm.controls['Crmv'].patchValue(rec[0].Crmv);
        this.vetForm.controls['Clinica'].patchValue(rec[0].Clinica);
        this.vetForm.controls['DataNasc'].patchValue(rec[0].DataNasc);
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
      console.log(rec[0])
      this.enderecoForm.controls['Cpf'].patchValue(rec[0].cpf)
      this.enderecoForm.controls['Bairro'].patchValue(rec[0].Bairro)
      this.enderecoForm.controls['Logradouro'].patchValue(rec[0].Logradouro)
      this.enderecoForm.controls['Numero'].patchValue(rec[0].Numero)
      this.enderecoForm.controls['Complemento'].patchValue(rec[0].Complemento)
    })
  }

  getDataNasc(event: MatDatepickerInputEvent<Date>) {
    this.vetForm.controls['DataNasc'].patchValue(event.value.toISOString().slice(0, 10));
  }

}
