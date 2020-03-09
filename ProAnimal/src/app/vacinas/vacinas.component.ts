import { Component, OnInit } from '@angular/core';
import { iVacinas } from '../models/vacinas.model';
import { Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { VacinasService } from '../shared/vacinas.service';

@Component({
  selector: 'app-vacinas',
  templateUrl: './vacinas.component.html',
  styleUrls: ['./vacinas.component.css']
})
export class VacinasComponent implements OnInit {

  vacinas$: Observable<iVacinas[]>;

  vaxForm = this.fb.group({
    idVacina: [undefined],
    Nome: ['', [Validators.required]],
    Finalidade: ['', [Validators.required]]
  })


  constructor(
    private fb: FormBuilder,
    private vacinaService: VacinasService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    let v: iVacinas = this.vaxForm.value;
    if (!v.IdVacinas) {
      this.addVacina(v);
    } else {
      this.updateVacina(v);
    }
  }

  addVacina(v: iVacinas) {
    this.vacinaService.addVacinas(v)
      .then(() => {
        this.snackBar.open('Vacina Adicionada.', 'OK', { duration: 2500 })
      })
      .catch(() => {
        this.snackBar.open('Erro ao submeter a vacina')
      })
  }

  updateVacina(v: iVacinas) {

  }

}
