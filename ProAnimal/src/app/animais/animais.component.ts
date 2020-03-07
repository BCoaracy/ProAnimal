import { Component, OnInit } from '@angular/core';
import { AnimaisService } from '../shared/animais.service';
import { Animais } from './animais';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { async } from '@angular/core/testing';
import { iAnimais } from '../models/animais.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-animais',
  templateUrl: './animais.component.html',
  styleUrls: ['./animais.component.css']
})
export class AnimaisComponent implements OnInit {
  animal: Animais = {
    IdChip: '',
    Tutor: '',
    DataNasc: null,
    Especie: '',
    Nome: '',
    Observacoes: '',
    Raca: '',
    Tamanho: '',
    Ocorrencias: null,
  };
  
  a: AngularFirestoreCollection<Animais>;

constructor(
    private _animaisService: AnimaisService
  ) { }

  ngOnInit() { this.showAnimalConsole(); }

  public getAnimalControle(idChip: string){
    this.animal.IdChip = this._animaisService.getAnimal(idChip);
  }

  public updateAnimal(property: string, value: any) {
    console.log('updata o bicho');
    this._animaisService.updateAnimal(this.animal);
  }

  public salvaAnimal() {
    this._animaisService.createAnimal(this.animal);
  }

  public showAnimalConsole(){
    console.log(this.animal);
    console.log('pega o bicho\n' + this.animal.Nome + '\n'
      + this.animal.IdChip + '\n'
      + this.animal.Tutor + '\n'
      + this.animal.DataNasc + '\n'
      + this.animal.Especie + '\n'
      + this.animal.Nome + '\n'
      + this.animal.Observacoes + '\n'
      + this.animal.Raca + '\n'
      + this.animal.Tamanho + '\n'
      + this.animal.Ocorrencias + '\n'
    );
  }

}
