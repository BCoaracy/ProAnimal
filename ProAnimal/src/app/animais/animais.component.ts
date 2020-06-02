import { Component, OnInit } from '@angular/core';
import { AnimaisService } from '../services/animais.service';
import { PersonaService } from '../services/persona.service';
import { HistoricoService } from '../services/historico.service';
import { MatSnackBar } from '@angular/material';
import { iAnimais } from '../models/animais.model';
import { Observable } from 'rxjs';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { iTutores } from '../models/tutores.model';
import { Router } from '@angular/router';
import { AgendamentosComponent } from '../agendamentos/agendamentos.component';
import { iHistorico } from '../models/historico.model';

@Component({
  selector: 'app-animais',
  templateUrl: './animais.component.html',
  styleUrls: ['./animais.component.css']
})
export class AnimaisComponent implements OnInit {

  tutor$: Observable<iTutores[]>;
  animal$: Observable<iAnimais[]>;
  formCadastro: FormGroup;
  tabela: FormGroup;
  displayedColumns = ['Nome', 'Tutor', 'Especie', 'Raca', 'Tamanho'];
  idFormControl = new FormControl(['', [Validators.required]]);
  recebido: boolean;
  ListaHistorico$: Observable<iHistorico[]>;
  tabelaHistorico = false;

  displayedColumnsHist = ['Tipo', 'Data', 'Observacao'];
  tamanhos = [
    { value: 'Pequeno' },
    { value: 'Medio' },
    { value: 'Grande' }
  ];
  especies = [
    { value: 'Canina' },
    { value: 'Felina' },
    { value: 'Outros' }
  ];

  configForm() {
    this.formCadastro = this.fb.group({
      IdChip: ([undefined]),
      Tutor: (['', [Validators.required]]),
      NomeTutor: [{ value: '', disabled: true }],
      DataNasc: (['', [Validators.required]]),
      Especie: (['', [Validators.required]]),
      Nome: (['', [Validators.required]]),
      Observacoes: (''),
      Raca: (['', [Validators.required]]),
      Tamanho: (['', [Validators.required]]),
      Adocao: (false)
    }),
      this.tabela = this.fb.group({
        Nome: (''),
        Tutor: (''),
        Especie: (''),
        Raca: (''),
        Tamanho: ('')
      });
  }


  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private animaisService: AnimaisService,
    private pService: PersonaService,
    private hService: HistoricoService,
    private router: Router
  ) { }



  ngOnInit() {
    this.configForm();
    this.idFormControl.setValue('');
    this.animal$ = this.animaisService.getAnimal('0');
    this.recebido = false;
  }

  disableTutorNome() {
    this.formCadastro.controls['NomeTutor'].disable();
  }

  searchAnimal() {
    this.animal$ = this.animaisService.getAnimal(this.idFormControl.value);
    this.animal$.subscribe(rec => {
      try {
        this.ListaHistorico$ = this.hService.getHistorico(rec[0].IdChip);
        this.tabelaHistorico = true;
        this.updateForm(rec[0]);
        this.recebido = true;
      } catch (error) {
        this.snackBar.open('Cadastro não encontrado.', 'OK', { duration: 4000 });
        console.log(error);
        this.recebido = false;
      }
    });

  }

  updateForm(animal: iAnimais) {
    this.formCadastro.controls['IdChip'].patchValue(animal.IdChip);
    this.formCadastro.controls['Tutor'].patchValue(animal.Tutor);
    this.formCadastro.controls['DataNasc'].patchValue(animal.DataNasc);
    this.formCadastro.controls['Especie'].patchValue(animal.Especie);
    this.formCadastro.controls['Nome'].patchValue(animal.Nome);
    this.formCadastro.controls['Raca'].patchValue(animal.Raca);
    this.formCadastro.controls['Tamanho'].patchValue(animal.Tamanho);
    this.formCadastro.controls['Observacoes'].patchValue(animal.Observacoes);
    this.formCadastro.controls['Adocao'].patchValue(animal.Adocao);
    this.updateNomeTutor(animal.Tutor);
  }

  onSubmit() {
    let a: iAnimais = this.formCadastro.value;
    a.NomeTutor = this.formCadastro.controls['NomeTutor'].value;
    if (this.recebido == false) {
      console.log('Tentando adicionar')
      this.addAnimal(a);
    } else {
      console.log('Tentando updatar')
      this.updateAnimal(a)
    }
  }

  updateAnimal(a: iAnimais) {
    console.log(a);
    this.animaisService.updateAnimal(a)
      .then(() => {
        this.snackBar.open('Edição Completa.', 'OK', { duration: 2500 })
      })
      .catch(() => {
        this.snackBar.open('Erro ao submeter a alteração')
      })
  }


  checkCpfTutorExist(event): Boolean {
    let cpf: string;
    cpf = event.target.value;
    if (cpf.length <= 10) {
      return false
    }
    return this.updateNomeTutor(cpf);
  }

  updateNomeTutor(cpf: string): Boolean {
    this.tutor$ = this.pService.searchTutorByCpf(cpf);
    console.log('buscou o tutor')

    if (this.tutor$ != null) {
      this.tutor$.subscribe(rec => {
        try {
          if (rec[0].Bloqueado == true) {
            this.snackBar.open('Esse Tutor está impossibilitado de adotar um animal!', 'OK');
            this.formCadastro.reset();
            return false;
          }
          this.formCadastro.controls['NomeTutor'].patchValue(rec[0].Nome);
        } catch{
          this.snackBar.open('Verifiquei se o CPF foi digitado corretamente, ou se o Tutor já está cadastrado.', 'OK');
        }
      })
      console.log("Cpf valido")
      return true;
    }
    console.log("Cpf inválido")
    return false;
  }

  addAnimal(a: iAnimais) {

    this.animaisService.createAnimal(a)
      .then(() => {
        this.snackBar.open('Adição Completa.', 'OK', { duration: 2000 })
      })
      .catch((error) => {
        this.snackBar.open('Erro ao salvar.' + error, 'OK', { duration: 2000 })
      })
  }


  abrirAgendamento() {
    this.router.navigate(['../agendamentos', this.formCadastro.controls['IdChip'].value]);
  }

  abrirHistorico() {
    this.router.navigate(['./animais/historico', this.formCadastro.controls['IdChip'].value]);

  }

}
