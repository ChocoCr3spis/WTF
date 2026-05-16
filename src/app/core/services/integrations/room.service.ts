import { inject, Injectable } from '@angular/core';
import { Firestore, doc, setDoc, docData, serverTimestamp, Timestamp, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Auth, authState } from '@angular/fire/auth';
import { BehaviorSubject, of, switchMap, map, firstValueFrom, filter } from 'rxjs';
import { addDoc, collection } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class RoomService {

  private firestore = inject(Firestore);
  
  getRoom(roomId: string) {
    const ref = doc(this.firestore,`rooms/${roomId}/battle/current`);
    return docData(ref, { idField: 'id' });
  }

  async createRoom(config: any){
    const ref = collection(this.firestore, `rooms`)
    return (await addDoc(ref, {config: config})).id
  }
}