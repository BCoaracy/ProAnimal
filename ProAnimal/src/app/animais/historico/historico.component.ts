import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { iAnimais } from 'src/app/models/animais.model';
import { AnimaisService } from 'src/app/services/animais.service';
import { VacinasService } from 'src/app/services/vacinas.service';
import { DoencasService } from 'src/app/services/doencas.service';
import { Observable } from 'rxjs';
import { iVacinas } from 'src/app/models/vacinas.model';
import { iDoencas } from 'src/app/models/doencas.model';
import { iOutros } from 'src/app/models/Outros.model';
import { iHistorico } from 'src/app/models/historico.model';
import { HistoricoService } from 'src/app/services/historico.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDatepickerInputEvent, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { VermifugosService } from 'src/app/services/vermifugos.service';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';

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
  listaHistoricos$: Observable<iHistorico[]>;
  formCadHistorico: FormGroup;
  IdAnimal = '';
  NomeAnimal: string;
  NomeTutor: string;
  displayedColumns = ['Tipo', 'Data', 'Observacoes'];

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
    this.IdAnimal = this._route.snapshot.paramMap.get('idchip');
    this.listaHistoricos$ = this.hService.getHistorico(this.IdAnimal);
    this.animal$ = this.aService.getAnimal(this.IdAnimal);
    this.animal$.subscribe(rec => {
      this.NomeAnimal = rec[0].Nome;
      this.NomeTutor = rec[0].NomeTutor;
      this.listarHistorico(rec[0]);
    })
  }



  Tipos = [
    { value: 'Vacina' },
    { value: 'Doença' },
    { value: 'Vermifugo' },
    { value: 'Outro' }
  ]


  public listarHistorico(a: iAnimais) {
    this.listaHistoricos$ = this.hService.getHistorico(a.IdChip);
    return this.listaHistoricos$;
  }

  onClickNovo(): void {
    const dialogRef = this.dialog.open(HistoricoDialog, {
      width: '250px',
      data: {
        IdTipo: this.idtipo, IdAnimal: this.IdAnimal,
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
//#region Dialog ----------------------------------------------------------------------------
@Component({
  selector: 'historicoDialog',
  templateUrl: 'historicoDialog.html',
})
export class HistoricoDialog {


  constructor(
    public fb: FormBuilder,
    public vService: VacinasService,
    public hService: HistoricoService,
    public verService: VermifugosService,
    public zService: DoencasService,
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
      IdAnimal: this.data.IdAnimal, //new FormControl(['', [Validators.required]]),
      Tipo: new FormControl('', [Validators.required]),
      Data: new FormControl(['', [Validators.required]]),
      DataRetorno: new FormControl(undefined),
      Observacoes: (["", [Validators.required]])
    })
  }

  Tipos$ = [
    { value: 'Vacina' },
    { value: 'Vermifugo' },
    { value: 'Zoonose' },
    { value: 'Outro' }
  ]

  listaTipos$: Observable<any[]>;

  dataMin = new Date();
  // filtroDiasSemana = (d: Date | null): boolean => {
  //   const day = (d || new Date()).getDay();
  //   return day !== 0 && day !== 6;
  // }

  getData(event: MatDatepickerInputEvent<Date>) {
    console.log(event.target.value);
    this.formCadHistorico.controls['Data'].patchValue(event.value.toISOString().slice(0, 10));
  }
  getDataRetorno(event: MatDatepickerInputEvent<Date>) {
    console.log(event.target.value);
    this.formCadHistorico.controls['DataRetorno'].patchValue(event.value.toISOString().slice(0, 10));
  }

  onSelectTipo(event) {
    if (this.formCadHistorico.controls['IdTipo'].disabled) {
      this.formCadHistorico.controls['IdTipo'].enable();
    }
    if (event.value == 'Vacina') {
      this.getListaVacinas();
    }
    if (event.value == 'Vermifugo') {
      this.getListaVermifugos()
    } if (event.value == 'Zoonose') {
      this.getListaZoonoses();
    } if (event.value == 'Outro') {
      this.selecionadoOutros();
    }
  }
  selecionadoOutros() {
    this.formCadHistorico.controls['IdTipo'].disable();
  }
  getListaZoonoses() {
    this.listaTipos$ = this.zService.getDoencas();
  }
  getListaVermifugos() {
    this.listaTipos$ = this.verService.getVermifugos();
  }

  getListaVacinas() {
    this.listaTipos$ = this.vService.getVacinas();
  }

  salvarHistorico() {

    let h: iHistorico = this.formCadHistorico.value;
    this.hService.addHistorico(h)
      .then(() => {
        this.dialogRef.close();
      })
      .catch(() => {
        console.log('erro')
        this.dialogRef.close();
      })
  }

}
//#endregion
