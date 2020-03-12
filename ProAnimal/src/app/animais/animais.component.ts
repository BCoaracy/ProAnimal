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
    //IdChip: ['', [Validators.required]], 
    Tutor:['', [Validators.required]],
    DataNasc:['', [Validators.required]],
    Especie:['', [Validators.required]],
    Nome:['', [Validators.required]],
    Observacoes:['', [Validators.required]],
    Raca:['', [Validators.required]],
    Tamanho:['', [Validators.required]],
    Ocorrencias:['', [Validators.required]]
  })
 

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private animaisService: AnimaisService,
  ) { }

  ngOnInit() {  }

  public searchAnimal() {
    let a: iAnimais = this.animalForm.value;
    this.animal$ = this.animaisService.getAnimal(a.IdChip);
  }

  // public updateAnimal(property: string, value: any) {
  //   console.log('updata o bicho');
  //   this.animaisService.updateAnimal(this.animal);
  // }

  // public salvaAnimal() {
  //   this.animaisService.createAnimal(this.animal);
  // }

  

}
