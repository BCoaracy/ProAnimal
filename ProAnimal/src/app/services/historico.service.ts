import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { iHistorico } from '../models/historico.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HistoricoService {

  private historicoCollection: AngularFirestoreCollection<iHistorico>
    = this.afs.collection('historico');

  constructor(private afs: AngularFirestore) { }

  getHistorico(id: string): Observable<iHistorico[]> {
    return this.afs.collection<iHistorico>('historico',
      ref => ref.where('IdAnimal', '==', id))
      .valueChanges();
  }

  addTutor(h: iHistorico) {
    h.Id = this.afs.createId();
    return this.historicoCollection.doc(h.Id).set(h);
  }

}
