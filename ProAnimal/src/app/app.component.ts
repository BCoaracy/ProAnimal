import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { animais } from './models/animais.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'Pro-Animal';

  animal$: Observable<animais[]>;

  constructor(
    private db: AngularFirestore
  ){}

  ngOnInit(): void {
    this.animal$ = this.db.collection<animais>('/animais').valueChanges();
  }

}
