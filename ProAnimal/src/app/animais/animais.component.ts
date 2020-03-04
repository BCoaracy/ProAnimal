import { Component, OnInit } from '@angular/core';
import { AnimaisService } from '../shared/animais.service';
import { Animais } from './animais';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
//import { Animais } from '../models/animais.model';

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

  ngOnInit() {  }

  public getAnimalControle(idChip: string){
     //= this._animaisService.getAnimal(idChip);
    console.log('pega o bicho');
  }

  public updateAnimal(property: string, value: any){
    console.log('updata o bicho');
    //this._animaisService.updateAnimal(this.animal);
  }
  

}
