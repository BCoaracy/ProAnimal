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
  filterVax$: Observable<iVacinas[]>;
  displayedColumns = ['Nome', 'Finalidade', 'Funcoes'];

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

  updateVacina(v:iVacinas){
    this.vacinaService.updateVacina(v)
    .then(()=>{
      this.snackBar.open('Vacina Editada', 'OK', {duration: 2000})
      this.vaxForm.reset({Nome:'', Finalidade:'', Id: undefined});
      this.vaxNome.nativeElement.focus();
    })
    .catch((e)=> {
      console.log(e);
      this.snackBar.open('Ocorreu um erro ao remover o item', 'OK', {duration: 2000})
    });
  }

  edit(v: iVacinas) {
    this.vaxForm.setValue(v);
    // this.vacinaService.updateVacina(v);
  }

  del(v: iVacinas){
    this.vacinaService.deleteVacina(v)
      .then(()=>{
        this.snackBar.open('A Vacina foi removida', 'OK', {duration: 2000})
      })
      .catch((e)=> {
        console.log(e);
        this.snackBar.open('Ocorreu um erro ao remover o item', 'OK', {duration: 2000})
      });

  }

  filter(event){
    this.filterVax$ = this.vacinaService.searchByName(event.target.value);
  }

}
