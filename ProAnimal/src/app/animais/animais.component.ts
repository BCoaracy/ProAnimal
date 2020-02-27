import { Component, OnInit } from '@angular/core';
import { AnimaisService } from '../shared/animais.service';
import { Animais } from './animais';

@Component({
  selector: 'app-animais',
  templateUrl: './animais.component.html',
  styleUrls: ['./animais.component.css']
})
export class AnimaisComponent implements OnInit {

  public microchip = "0";
  private animal: Animais;
  constructor(
    public _animaisService: AnimaisService
  ) { }

  ngOnInit() {
  }

  public getAnimalControle(idChip: number){
    this.animal = this._animaisService.getAnimal(idChip);
  }

}
