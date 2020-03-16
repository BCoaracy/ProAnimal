import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { iDoencas } from '../models/doencas.model';
import { Observable, from } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { DoencasService } from '../shared/doencas.service';


@Component({
  selector: 'app-doencas',
  templateUrl: './doencas.component.html',
  styleUrls: ['./doencas.component.css']
})
export class DoencasComponent implements OnInit {

  doencas$: Observable<iDoencas[]>;
  filterDoencas$: Observable<iDoencas[]>
  displayedColumns = ['Nome', 'Sintomas', 'Zoonose', 'Funcoes']

  doenForm = this.fb.group({
    Id: [undefined],
    Nome: ['', [Validators.required]],
    Sintomas: ['', [Validators.required]],
    Zoonose: [false, [Validators.required]]
  })


  constructor(
    private fb: FormBuilder,
    private dService: DoencasService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.doencas$ = this.dService.getDoencas();
  }

  onSubmit() {
    let v: iDoencas = this.doenForm.value;
    if (!v.Id) {
      this.addVacina(v);
    } else {
      this.updateVacina(v);
    }
  }

  addVacina(d: iDoencas) {
    this.dService.addDoenca(d)
      .then(() => {
        this.snackBar.open('Adicionado a lista.', 'OK', { duration: 2500 })
        this.doenForm.reset({ Nome: '', Finalidade: '', Id: undefined });
        //this.vaxNome.nativeElement.focus();
      })
      .catch(() => {
        this.snackBar.open('Erro ao submeter este item')
      })
  }

  updateVacina(d: iDoencas) {
    this.dService.updateDoencas(d)
      .then(() => {
        this.snackBar.open('Item editado', 'OK', { duration: 2000 })
        this.doenForm.reset({ Nome: '', Finalidade: '', IdDoenca: undefined });
        // this.vaxNome.nativeElement.focus();
      })
      .catch((e) => {
        console.log(e);
        this.snackBar.open('Ocorreu um erro ao remover o item', 'OK', { duration: 2000 })
      });
  }

  edit(v: iDoencas) {
    this.doenForm.setValue(v);
  }

  del(d: iDoencas) {
    this.dService.deleteDoencas(d)
      .then(() => {
        this.snackBar.open('A Vacina foi removida', 'OK', { duration: 2000 })
      })
      .catch((e) => {
        console.log(e);
        this.snackBar.open('Ocorreu um erro ao remover o item', 'OK', { duration: 2000 })
      });

  }

  filter(event) {
    this.filterDoencas$ = this.dService.searchByName(event.target.value);
  }


}
