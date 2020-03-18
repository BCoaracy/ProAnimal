import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnimaisComponent } from './animais/animais.component';
import { DoencasComponent } from './doencas/doencas.component';
import { VacinasComponent } from './vacinas/vacinas.component';
import { TutoresComponent } from './tutores/tutores.component';


const routes: Routes = [
  {path: 'animais', component: AnimaisComponent},
  {path: 'vacinas', component: VacinasComponent},
  {path: 'doencas', component: DoencasComponent},
  {path: 'tutores', component: TutoresComponent},
  {path: 'principal', component: Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
