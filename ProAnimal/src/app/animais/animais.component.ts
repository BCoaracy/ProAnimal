import { Component, OnInit } from '@angular/core';
import { AnimaisService } from '../shared/animais.service';
import { MatSnackBar } from '@angular/material';
import { iAnimais } from '../models/animais.model';
import { Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-animais',
  templateUrl: './animais.component.html',
  styleUrls: ['./animais.component.css']
})
export class AnimaisComponent implements OnInit {

  animal$: Observable<iAnimais[]>;
  //filterTutores$:Observable<iTutores[]>; // A fazer
  animalForm = this.fb.group({
    IdChip: [undefined],
    Tutor: ['', [Validators.required]],
    DataNasc: ['', [Validators.required]],
    Especie: ['', [Validators.required]],
    Nome: ['', [Validators.required]],
    Observacoes: ['', [Validators.required]],
    Raca: ['', [Validators.required]],
    Tamanho: ['', [Validators.required]],
    Ocorrencias: ['']
  })


  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private animaisService: AnimaisService,
  ) { }

  ngOnInit() { 
    console.log(this.animaisService.getAnimal('32'))
  }

  searchAnimal(IdChip: string) {
    console.log('Chip lido pelo search: ' + IdChip)
    let a = this.animaisService.getAnimal(IdChip);
    this.animalForm.setValue(a);
  }

  // reset form

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



}
