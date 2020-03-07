import { Component, OnInit } from '@angular/core';
import { Vacinas } from '../models/vacinas.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vacinas',
  templateUrl: './vacinas.component.html',
  styleUrls: ['./vacinas.component.css']
})
export class VacinasComponent implements OnInit {

  Vacinas$: Observable<Vacinas[]>;

  constructor() { }

  ngOnInit() {
  }

}
