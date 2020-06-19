import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
// Import Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

// Import Angular Material
import { MatToolbarModule, MatDividerModule, MatButtonModule, MatTableModule, MatCheckboxModule, MatSelectModule, MatSidenavModule, MatCardModule, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment.prod';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnimaisComponent } from './animais/animais.component';
import { AnimaisService } from './services/animais.service';
import { VacinasComponent } from './vacinas/vacinas.component';
import { DoencasComponent } from './doencas/doencas.component';
import { TutoresComponent } from './tutores/tutores.component';
import { VeterinariosComponent } from './veterinarios/veterinarios.component';
import { from } from 'rxjs';
import { MaterialModule } from './material.module';
import { HistoricoComponent, HistoricoDialog } from './animais/historico/historico.component';
import { AgendamentosComponent } from './agendamentos/agendamentos.component';
import { AppMainNavComponent } from './app-main-nav/app-main-nav.component';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr)
import { MatMomentDateModule, MomentDateAdapter, MAT_MOMENT_DATE_FORMATS, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { VermifugosComponent } from './vermifugos/vermifugos.component';
import { AniAdocaoComponent } from './ani-adocao/ani-adocao.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/Register/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    AppMainNavComponent,
    AnimaisComponent,
    VacinasComponent,
    DoencasComponent,
    TutoresComponent,
    VeterinariosComponent,
    HistoricoComponent,
    HistoricoDialog,
    AgendamentosComponent,
    VermifugosComponent,
    AniAdocaoComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatSidenavModule,
    MatSliderModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MaterialModule,
    MatCheckboxModule,
    MatSelectModule,
    MatMomentDateModule,
    AngularFireAuthModule,
    AppRoutingModule,
  ],
  entryComponents: [
    HistoricoDialog
  ],
  providers: [
    AnimaisService,
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },

    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }],
  bootstrap: [AppComponent]
})
export class AppModule { }
