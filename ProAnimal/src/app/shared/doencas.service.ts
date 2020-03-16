import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { iDoencas } from '../models/doencas.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoencasService {

  private doencasCollection: AngularFirestoreCollection<iDoencas>
    = this.afs.collection('doencas')

  constructor(private afs: AngularFirestore) { }

  getDoencas(): Observable<iDoencas[]> {
    return this.doencasCollection.valueChanges();
  }

  addDoenca(d: iDoencas) {
    d.Id = this.afs.createId();
    return this.doencasCollection.doc(d.Id).set(d);
  }

  updateDoencas(d: iDoencas) {
    return this.doencasCollection.doc(d.Id).set(d);
  }

  deleteDoencas(d: iDoencas) {
    return this.doencasCollection.doc(d.Id).delete();
  }

  searchByName(nome: string): Observable<iDoencas[]> {
    return this.afs.collection<iDoencas>('doencas',
      ref => ref.orderBy('Nome').startAt(nome).endAt(nome + '\uf8ff'))
      .valueChanges();
  }

}
