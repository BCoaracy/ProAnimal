import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { iVermifugo } from '../models/vermifugos.model';
import { Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { VermifugosService } from '../services/vermifugos.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-vermifugos',
  templateUrl: './vermifugos.component.html',
  styleUrls: ['./vermifugos.component.css']
})
export class VermifugosComponent implements OnInit {

  vermifugos$: Observable<iVermifugo[]>;
  filterVer$: Observable<iVermifugo[]>;
  displayedColumns = ['Nome', 'Principio', 'Funcoes'];

  @ViewChild('nome', { static: false }) verNome: ElementRef;

  verForm = this.fb.group({
    Id: [undefined],
    Nome: ['', [Validators.required]],
    Principio: ['', [Validators.required]]
  })


  constructor(
    private fb: FormBuilder,
    private vService: VermifugosService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.vermifugos$ = this.vService.getVermifugos();

  }

  onSubmit() {
    let v: iVermifugo = this.verForm.value;
    if (!v.Id) {
      this.addVermifugo(v);
    } else {
      this.updateVermifugo(v);
    }
  }

  addVermifugo(v: iVermifugo) {
    this.vService.addVermifugos(v)
      .then(() => {
        this.snackBar.open('Item Adicionado.', 'OK', { duration: 2500 })
        this.verForm.reset({ Nome: '', Principio: '', Id: undefined });
        this.verNome.nativeElement.focus();
      })
      .catch(() => {
        this.snackBar.open('Erro ao submeter a vacina')
      })
  }

  updateVermifugo(v: iVermifugo) {
    this.vService.updateVermifugos(v)
      .then(() => {
        this.snackBar.open('Vacina Editada', 'OK', { duration: 2000 })
        this.verForm.reset({ Nome: '', Principio: '', Id: undefined });
        this.verNome.nativeElement.focus();
      })
      .catch((e) => {
        console.log(e);
        this.snackBar.open('Ocorreu um erro ao remover o item', 'OK', { duration: 2000 })
      });
  }

  edit(v: iVermifugo) {
    this.verForm.setValue(v);
  }

  del(v: iVermifugo) {
    this.vService.deleteVermifugos(v)
      .then(() => {
        this.snackBar.open('A Vacina foi removida', 'OK', { duration: 2000 })
      })
      .catch((e) => {
        console.log(e);
        this.snackBar.open('Ocorreu um erro ao remover o item', 'OK', { duration: 2000 })
      });

  }

  filter(event) {
    this.filterVer$ = this.vService.searchByName(event.target.value);
  }

}
