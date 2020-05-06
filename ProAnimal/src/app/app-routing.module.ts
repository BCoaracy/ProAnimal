import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnimaisComponent } from './animais/animais.component';
import { DoencasComponent } from './doencas/doencas.component';
import { VacinasComponent } from './vacinas/vacinas.component';
import { TutoresComponent } from './tutores/tutores.component';
import { AgendamentosComponent } from './agendamentos/agendamentos.component';


const routes: Routes = [
  { path: 'animais', component: AnimaisComponent },
  { path: 'vacinas', component: VacinasComponent },
  { path: 'doencas', component: DoencasComponent },
  { path: 'tutores', component: TutoresComponent },
  { path: 'agendamentos/:idchip', component: AgendamentosComponent },
  { path: '', pathMatch: 'full', redirectTo: 'animais' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
