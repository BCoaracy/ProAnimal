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
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/Register/register/register.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'animais', component: AnimaisComponent },
  { path: 'animaisAdocao', component: AniAdocaoComponent },
  { path: 'vacinas', component: VacinasComponent, canActivate: [AuthGuardService] },
  { path: 'vermifugos', component: VermifugosComponent, canActivate: [AuthGuardService]  },
  { path: 'doencas', component: DoencasComponent, canActivate: [AuthGuardService]  },
  { path: 'tutores', component: TutoresComponent, canActivate: [AuthGuardService]  },
  { path: 'veterinarios', component: VeterinariosComponent, canActivate: [AuthGuardService]  },
  { path: 'agendamentos/:idchip', component: AgendamentosComponent, canActivate: [AuthGuardService]  },
  { path: 'animais/historico/:idchip', component: HistoricoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'Register/register', component: RegisterComponent },

  { path: '', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
