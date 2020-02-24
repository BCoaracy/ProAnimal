import { Component, OnInit } from '@angular/core';
import { AnimaisService } from '../shared/animais.service';

@Component({
  selector: 'app-animais',
  templateUrl: './animais.component.html',
  styleUrls: ['./animais.component.css']
})
export class AnimaisComponent implements OnInit {

  constructor(
    private _animaisService: AnimaisService
  ) { }

  ngOnInit() {
  }

  public getAnimalControle(idChip: number){
    return this._animaisService.getAnimal(idChip);
  }

}
