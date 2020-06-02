import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnimaisComponent } from './animais/animais.component';
import { DoencasComponent } from './doencas/doencas.component';
import { VacinasComponent } from './vacinas/vacinas.component';
import { TutoresComponent } from './tutores/tutores.component';
import { AgendamentosComponent } from './agendamentos/agendamentos.component';
import { HistoricoComponent } from './animais/historico/historico.component';
import { VermifugosComponent } from './vermifugos/vermifugos.component';
import { VeterinariosComponent } from './veterinarios/veterinarios.component';
import { AniAdocaoComponent } from './ani-adocao/ani-adocao.component';

const routes: Routes = [
  { path: 'animais', component: AnimaisComponent },
  { path: 'animaisAdocao', component: AniAdocaoComponent },
  { path: 'vacinas', component: VacinasComponent },
  { path: 'vermifugos', component: VermifugosComponent },
  { path: 'doencas', component: DoencasComponent },
  { path: 'tutores', component: TutoresComponent },
  { path: 'veterinarios', component: VeterinariosComponent },
  { path: 'agendamentos/:idchip', component: AgendamentosComponent },
  { path: 'animais/historico/:idchip', component: HistoricoComponent },
  { path: '', pathMatch: 'full', redirectTo: 'animais' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
