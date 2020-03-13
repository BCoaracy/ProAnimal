import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Import Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';

// Import Angular Material
import { MatToolbarModule, MatDividerModule, MatButtonModule, MatTableModule, MatCheckboxModule } from '@angular/material';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnimaisComponent } from './animais/animais.component';
import { AnimaisService } from './shared/animais.service';
import { VacinasComponent } from './vacinas/vacinas.component';
import { DoencasComponent } from './doencas/doencas.component';
import { TutoresComponent } from './tutores/tutores.component';
import { VeterinariosComponent } from './veterinarios/veterinarios.component';
import { from } from 'rxjs';
import { MaterialModule } from './material.module';
import { HistoricoComponent } from './historico/historico.component';




@NgModule({
  declarations: [
    AppComponent,
    AnimaisComponent,
    VacinasComponent,
    DoencasComponent,
    TutoresComponent,
    VeterinariosComponent,
    HistoricoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MaterialModule,
    MatCheckboxModule
  ],
  providers: [AnimaisService],
  bootstrap: [AppComponent]
})
export class AppModule { }
