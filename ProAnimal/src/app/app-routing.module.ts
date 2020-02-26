import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnimaisComponent } from './animais/animais.component';
import { DoencasComponent } from './doencas/doencas.component';
import { VacinasComponent } from './vacinas/vacinas.component';


const routes: Routes = [
  {path: 'animais', component: AnimaisComponent},
  {path: 'vacinas', component: VacinasComponent},
  {path: 'doencas', component: DoencasComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
