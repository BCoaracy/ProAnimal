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
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

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

      });
    })
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
      console.log(result)
    });
  }

}

@Component({
  selector: 'historicoDialog',
  templateUrl: 'historicoDialog.html',
})
export class HistoricoDialog {


  constructor(
    public fb: FormBuilder,
    public vService: VacinasService,
    private hService: HistoricoService,
    public dialogRef: MatDialogRef<HistoricoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  formCadHistorico: FormGroup;

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.configForm();
  }
  configForm() {
    this.formCadHistorico = this.fb.group({
      IdTipo: new FormControl('', [Validators.required]),
      IdAnimal: new FormControl(['', [Validators.required]]),
      Tipo: new FormControl('', [Validators.required]),
      Data: new FormControl(['', [Validators.required]]),
      DataRetorno: new FormControl(['']),
      Observacoes: (["", [Validators.required]])
    })
  }

  Tipos$ = [
    { value: 'Vacina', valueIn: 1 },
    { value: 'Vermifugo', valueIn: 2 },
    { value: 'Zoonose', valueIn: 3 }
  ]

  //  listaTipos = [{value: '', idValue: ''}]
  listaTipos$: Observable<iVacinas[]>;

  dataMin = new Date();
  filtroDiasSemana = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  }

  getData(event: MatDatepickerInputEvent<Date>) {
    console.log(event.target.value);
    this.formCadHistorico.controls['Data'].patchValue(event.value.toISOString().slice(0, 10));
  }

  onSelectTipo(event) {
    if (event.value == 'Vacina') {
      this.getListaVacinas();
    }
  }

  getListaVacinas() {
    this.listaTipos$ = this.vService.getVacinas();
  }

  salvarHistorico() {
    let h: iHistorico = this.formCadHistorico.value;
    this.hService.addHistorico(h);

  }

}
