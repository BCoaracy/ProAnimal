import { Component, OnInit } from '@angular/core';
import { AnimaisService } from '../services/animais.service';
import { Observable } from 'rxjs';
import { iAnimais } from '../models/animais.model';

@Component({
  selector: 'app-ani-adocao',
  templateUrl: './ani-adocao.component.html',
  styleUrls: ['./ani-adocao.component.css']
})
export class AniAdocaoComponent implements OnInit {

  animais$: Observable<iAnimais[]>;

  constructor(private animaisService: AnimaisService, ) { }

  ngOnInit() {
    this.animais$ = this.animaisService.getAnimaisAdocao();
    this.animais$.subscribe(rec => {
      console.log(rec);
    })
  }

}
