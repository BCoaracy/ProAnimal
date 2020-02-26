import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Import Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

// Import Angular Material
import { MatToolbarModule, MatDividerModule, MatButtonModule } from '@angular/material';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnimaisComponent } from './animais/animais.component';
import { AnimaisService } from './shared/animais.service';
import { VacinasComponent } from './vacinas/vacinas.component';
import { DoencasComponent } from './doencas/doencas.component';



@NgModule({
  declarations: [
    AppComponent,
    AnimaisComponent,
    VacinasComponent,
    DoencasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
  ],
  providers: [AnimaisService],
  bootstrap: [AppComponent]
})
export class AppModule { }
