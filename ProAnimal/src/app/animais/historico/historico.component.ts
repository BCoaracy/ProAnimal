import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { iAnimais } from 'src/app/models/animais.model';
import { AnimaisService } from 'src/app/services/animais.service';
import { VacinasService } from 'src/app/services/vacinas.service';
import { DoencasService } from 'src/app/services/doencas.service';
import { Observable } from 'rxjs';
import { iVacinas } from 'src/app/models/vacinas.model';
import { iDoencas } from 'src/app/models/doencas.model';
import { iHistorico } from 'src/app/models/historico.model';
import { HistoricoService } from 'src/app/services/historico.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDatepickerInputEvent } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface DialogData {
  Id: string;
  IdTipo: string;
  IdAnimal: string;
  Tipo: string;
  Data: string;
  DataRetorno: string;
  Observacoes: string;
}

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {

  historico: iHistorico;
  animal$: Observable<iAnimais[]>;
  listaVacinas$: Observable<iVacinas[]>;
  listaDoencas$: Observable<iDoencas[]>;
  listaHistorico$: Observable<iHistorico[]>;
  formCadHistorico: FormGroup;
  displayedColumns = ['Tipo', 'Data', 'Observacao'];

  //DataDialog
  idtipo: string;
  idanimal: string;
  tipo: string;
  data: string;
  dataretorno: string;
  observacoes: string;

  configForm() {
    this.formCadHistorico = this.fb.group({
      IdTipo: (['', [Validators.required]]),
      IdAnimal: (['', [Validators.required]]),
      Tipo: (['', [Validators.required]]),
      Data: (['', [Validators.required]]),
      DataRetorno: (['']),
      Observacoes: (['', [Validators.required]])
    })
  }



  constructor(
    private _route: ActivatedRoute,
    private aService: AnimaisService,
    private hService: HistoricoService,
    public dialog: MatDialog,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this._route.snapshot.paramMap.get('idchip')
    this.animal$ = this.aService.getAnimal(this._route.snapshot.paramMap.get('idchip'));
    this.animal$.subscribe(rec => {
      this.listarHistorico(rec[0]);
    })
  }


  Tipos = [
    { value: 'Vacina' },
    { value: 'Doença' },
    { value: 'Vermifugo' },
    { value: 'Outro' }
  ]


  listarHistorico(a: iAnimais) {
    console.log('Listando Historico:')
    console.log('Animal: ', a.IdChip)
    this.listaHistorico$ = this.hService.getHistorico(a.IdChip);
    this.listaHistorico$.subscribe(ref => {
      ref.forEach(element => {
        console.log(element.Observacoes)
      });
    })
  }
  dataMin = new Date();
  filtroDiasSemana = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  }

  onSelectTipo(selecionado: string) {

  }

  onClickNovo(): void {
    const dialogRef = this.dialog.open(HistoricoDialog, {
      width: '250px',
      data: {
        IdTipo: this.idtipo, IdAnimal: this.idanimal,
        Tipo: this.tipo, Data: this.data, DataRetorno: this.dataretorno,
        Observacoes: this.observacoes
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

}
@Component({
  selector: 'historicoDialog',
  templateUrl: 'historicoDialog.html',
})
export class HistoricoDialog {

  constructor(
    public dialogRef: MatDialogRef<HistoricoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  Tipos$ = [
    { value: 'Vacina', valueIn: 1 },
    { value: 'Vermifugo', valueIn: 2 },
    { value: 'Zoonose', valueIn: 3 }
  ]

  getDataOcorrido(event: MatDatepickerInputEvent<Date>) {
    //this.form.controls['DataAgendada'].patchValue(event.value.toISOString().slice(0, 10));
  }

}
