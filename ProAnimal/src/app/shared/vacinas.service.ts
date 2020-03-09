import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { iVacinas } from '../models/vacinas.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacinasService {

  private vacinasCollection: AngularFirestoreCollection<iVacinas>
    = this.afs.collection('vacinas');

  constructor(private afs: AngularFirestore) { }

  getVacinas(): Observable<iVacinas[]> {
    return this.vacinasCollection.valueChanges();
  }

  addVacinas(v: iVacinas) {
    v.IdVacinas = this.afs.createId();
    v.dataProc = null;
    v.dataRetorno = null;

    return this.vacinasCollection.add(v);
  }

}
