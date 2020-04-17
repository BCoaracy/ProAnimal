import { Component, OnInit } from '@angular/core';
import { AnimaisService } from '../services/animais.service';
import { MatSnackBar } from '@angular/material';
import { iAnimais } from '../models/animais.model';
import { Observable } from 'rxjs';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { iTutores } from '../models/tutores.model';

@Component({
  selector: 'app-animais',
  templateUrl: './animais.component.html',
  styleUrls: ['./animais.component.css']
})
export class AnimaisComponent implements OnInit {

  // listaTutores$: Observable<iTutores[]>;
  animal$: Observable<iAnimais[]>;
  form: FormGroup;
  tabela: FormControl;
  displayedColumns = ['Nome', 'Tutor', 'Especie', 'Raca', 'Tamanho']

  idFormControl = new FormControl(['', [Validators.required]]);

  configForm() {
    this.form = this.fb.group({
      IdChip: new FormControl(['', [Validators.required]]),
      Tutor: new FormControl(['', [Validators.required]]),
      DataNasc: new FormControl(['', [Validators.required]]),
      Especie: new FormControl(['', [Validators.required]]),
      Nome: new FormControl(['', [Validators.required]]),
      Observacoes: new FormControl(['', [Validators.required]]),
      Raca: new FormControl(['', [Validators.required]]),
      Tamanho: new FormControl(['', [Validators.required]]),
      Ocorrencias: new FormControl([''])
    })
  }




  tamanhos = [
    { value: 'Pequeno' },
    { value: 'Medio' },
    { value: 'Grande' }
  ]
  especies = [
    { value: 'Canina' },
    { value: 'Felina' },
    { value: 'Outros' }
  ]

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private animaisService: AnimaisService,
  ) { }

  ngOnInit() {
    this.configForm();
    this.idFormControl.setValue('');
    this.form.patchValue({
      'IdChip': '',
      'Tutor': '',
      'DataNasc': '',
      'Especie': '',
      'Nome': '',
      'Raca': '',
      'Tamanho': '',
      'Observacoes': '',
    });
    this.animal$ = this.animaisService.getAnimal('0');
    this.form.setValue(this.animal$);

  }

  searchAnimal() {
    //this.animal$ = this.animaisService.getAnimal(this.idFormControl.value);
    this.animal$ = this.animaisService.getAnimal(this.idFormControl.value);
    this.animal$.subscribe(rec => {
      //this.form.controls['Nome'].patchValue(rec[0].Nome)
      this.updateForm(rec[0]);
    })

  }

  updateForm(animal: iAnimais) {
    this.form.controls['IdChip'].patchValue(animal.IdChip);
    this.form.controls['Tutor'].patchValue(animal.Tutor);
    this.form.controls['DataNasc'].patchValue(animal.DataNasc);
    this.form.controls['Especie'].patchValue(animal.Especie);
    this.form.controls['Nome'].patchValue(animal.Nome);
    this.form.controls['Raca'].patchValue(animal.Raca);
    this.form.controls['Tamanho'].patchValue(animal.Tamanho);
    this.form.controls['Observacoes'].patchValue(animal.Observacoes);
  }
  onSubmit() {
    if (this.checkCpfTutorExist(this.form.controls['Tutor'].value)) {
      this.animaisService.createOrUpdate(this.form.value)
        .then(() => {
          this.snackBar.open('Adição Completa.', 'OK', { duration: 2000 })
          this.form.reset()
        })
        .catch((error) => {
          this.snackBar.open('Erro ao salvar. \n ' + error, 'OK', { duration: 2000 })
        })
    } else {
      this.snackBar.open('Erro ao salvar. O tutor informado não existe. Verifique o CPF informado,' +
        'ou Adicione esse tutor a base de dados', 'OK', { duration: 2000 });
    }
  }

  checkCpfTutorExist(cpf: string): Boolean {
    if (this.animaisService.searchByCpf(cpf) != null)
      return true;
    return false;
  }

  addAnimal(a: iAnimais) {
    // this.animaisService.createAnimal(a)
    //   .then(() => {
    //     this.snackBar.open('Adição Completa.', 'OK', { duration: 2000 })
    //   })
    //   .catch((error) => {
    //     this.snackBar.open('Erro ao salvar.' + error, 'OK', { duration: 2000 })
    //   })
  }

  private listaTutores$: Observable<iTutores[]>;



  filterCpf(event) {
    this.listaTutores$ = this.animaisService.searchByCpf(event.target.value);
  }

  // displayFn(subject) {
  //   return subject ? subject.cpf : undefined;
  // }

}
