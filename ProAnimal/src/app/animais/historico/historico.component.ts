import { Component, OnInit } from '@angular/core';
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
import { element } from 'protractor';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {

  animal$: Observable<iAnimais[]>;
  listaVacinas$: Observable<iVacinas[]>;
  listaDoencas$: Observable<iDoencas[]>;
  //listaHistorico$: Observable<iHistorico[]>;
  listaHistorico$: any;
  displayedColumns = ['Tipo', 'Data', 'Observacao'];


  constructor(
    private _route: ActivatedRoute,
    private aService: AnimaisService,
    private hService: HistoricoService,
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
    this.listaHistorico$ = this.hService.getHistorico(a.IdChip);
  }

  onSelectTipo(selecionado: string) {

  }

}
