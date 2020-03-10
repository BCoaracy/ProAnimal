import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { iVacinas } from '../models/vacinas.model';
import { Observable, from } from 'rxjs';
import { FormBuilder, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { VacinasService } from '../shared/vacinas.service';


@Component({
  selector: 'app-vacinas',
  templateUrl: './vacinas.component.html',
  styleUrls: ['./vacinas.component.css']
})
export class VacinasComponent implements OnInit {

  vacinas$: Observable<iVacinas[]>;
  displayedColumns = ['Nome', 'Finalidade'];

  @ViewChild('nome', {static:false}) vaxNome: ElementRef;

  vaxForm = this.fb.group({
    Id: [undefined],
    Nome: ['', [Validators.required]],
    Finalidade: ['', [Validators.required]]
  })


  constructor(
    private fb: FormBuilder,
    private vacinaService: VacinasService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.vacinas$ = this.vacinaService.getVacinas();
    
  }

  onSubmit() {
    console.log('Entrou no submit');
    let v: iVacinas = this.vaxForm.value;
    if (!v.Id) {
      this.addVacina(v);
    } else {
      this.updateVacina(v);
    }
  }

  addVacina(v: iVacinas) {
    this.vacinaService.addVacinas(v)
      .then(() => {
        this.snackBar.open('Vacina Adicionada.', 'OK', { duration: 2500 })
        this.vaxForm.reset({Nome:'', Finalidade:'', Id: undefined});
        this.vaxNome.nativeElement.focus();
      })
      .catch(() => {
        this.snackBar.open('Erro ao submeter a vacina')
      })
  }

  updateVacina(v: iVacinas) {

  }

}
