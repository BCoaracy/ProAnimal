import { Injectable } from '@angular/core';
import { iVermifugo } from '../models/vermifugos.model';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VermifugosService {

  private vermifugosCollection: AngularFirestoreCollection<iVermifugo>
    = this.afs.collection('vermifugos');

  constructor(private afs: AngularFirestore) { }

  getVermifugos(): Observable<iVermifugo[]> {
    return this.vermifugosCollection.valueChanges();
  }

  addVermifugos(v: iVermifugo) {

    v.Id = this.afs.createId();
    return this.vermifugosCollection.doc(v.Id).set(v);
    // return this.vermifugosCollection.add(v);
  }

  updateVermifugos(v: iVermifugo) {
    return this.vermifugosCollection.doc(v.Id).set(v);
  }

  deleteVermifugos(v: iVermifugo) {
    return this.vermifugosCollection.doc(v.Id).delete();
  }

  searchByName(nome: string): Observable<iVermifugo[]> {
    return this.afs.collection<iVermifugo>('vermifugos',
      ref => ref.orderBy('NomeComercial').startAt(nome).endAt(nome + "\uf8ff"))
      .valueChanges();
  }

}
