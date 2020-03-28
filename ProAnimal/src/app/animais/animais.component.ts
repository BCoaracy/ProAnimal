import { Component, OnInit } from '@angular/core';
import { AnimaisService } from '../shared/animais.service';
import { MatSnackBar } from '@angular/material';
import { iAnimais } from '../models/animais.model';
import { Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { iTutores } from '../models/tutores.model';

@Component({
  selector: 'app-animais',
  templateUrl: './animais.component.html',
  styleUrls: ['./animais.component.css']
})
export class AnimaisComponent implements OnInit {

  // listaTutores$: Observable<iTutores[]>;
  animal$: Observable<iAnimais[]>;
  displayedColumns = ['Nome', 'Tutor', 'Ocorrencias', 'Especie', 'Raca', 'Tamanho']

  animalForm = this.fb.group({
    IdChip: ['', [Validators.required]],
    Tutor: ['', [Validators.required]],
    DataNasc: ['', [Validators.required]],
    Especie: ['', [Validators.required]],
    Nome: ['', [Validators.required]],
    Observacoes: ['', [Validators.required]],
    Raca: ['', [Validators.required]],
    Tamanho: ['', [Validators.required]],
    Ocorrencias: ['']
  })

  tamanhos = [
    { value: 'Pequeno' },
    { value: 'Medio' },
    { value: 'Grande' }
  ]

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private animaisService: AnimaisService,
  ) { }

  ngOnInit() {
    // this.listaTutores$ = null;
  }

  searchAnimal() {
    let a =
      this.animaisService.getAnimal(this.animalForm.value.IdChip);
    console.log(a);
    this.animalForm.reset({ IdChip: '' });
    console.log('Setando formulario')
    this.animalForm.setValue(a);

  }

  onSubmit() {
    console.log('entrou onsubmit')
    let a: iAnimais = this.animalForm.value;
    console.log(a);
    if (a.IdChip) {
      this.addAnimal(a);
    } else {
      // this.updateAnimal(a);
    }
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

  private tutor: Observable<iTutores>;

  checkCpfTutorExist(cpf: string) {
    this.tutor = this.animaisService.searchByCpf(cpf).map(res => res.data as iTutores);


  }

  // filterCpf(event) {
  //   this.listaTutores$ = this.animaisService.searchByCpf(event.target.value);
  // }

  // displayFn(subject) {
  //   return subject ? subject.cpf : undefined;
  // }

}
