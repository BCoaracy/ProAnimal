import { Component, OnInit } from '@angular/core';
import { AnimaisService } from '../shared/animais.service';
import { Animais } from './animais';
//import { Animais } from '../models/animais.model';

@Component({
  selector: 'app-animais',
  templateUrl: './animais.component.html',
  styleUrls: ['./animais.component.css']
})
export class AnimaisComponent implements OnInit {
  animal: Animais = {IdChip: '',
  Tutor: '',
  DataNasc: null,
  Especie: '',
  Nome: '',
  Observacoes: '',
  Raca: '',
  Tamanho: '',
};
  constructor(
    private _animaisService: AnimaisService
  ) { }

  ngOnInit() {
    
  }

  public getAnimalControle(idChip: string){
    this.animal = this._animaisService.get(idChip);
  }

  public updateAnimal(property: string, value: any){
    //this._animaisService.updateAnimal(this.)
  }
  

}
