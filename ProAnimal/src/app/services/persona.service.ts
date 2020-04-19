import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { iTutores } from '../models/tutores.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private tutoresCollection: AngularFirestoreCollection<iTutores>
    = this.afs.collection('tutores');

  constructor(private afs: AngularFirestore) { }

  addTutor(t: iTutores) {
    t.Id = this.afs.createId();
    return this.tutoresCollection.doc(t.Id).set(t);
  }

  update(t: iTutores) {
    return this.tutoresCollection.doc(t.Id).set(t);
  }

  searchTutorByCpf(cpf: string): Observable<iTutores[]> {
    return this.afs.collection<iTutores>('tutores',
      ref => ref.orderBy('Cpf').startAt(cpf).endAt(cpf + '\uf8ff'))
      .valueChanges();
  }


}
