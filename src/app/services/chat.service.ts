import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Message } from '../interfaces/message.interface';

import { map } from 'rxjs/operators';
import { text } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Message>;
  public chats: Message[] = [];

  constructor(private afs: AngularFirestore) {


  }

  loadMessages() {
    this.itemsCollection = this.afs.collection<Message>('chats');
    return this.itemsCollection.valueChanges().pipe(
      map((mensajes: Message[]) => {
        this.chats = mensajes;
      }));
  }

  addMessage(text: string) {
    const message: Message = {
      name: 'Demo',
      message: text,
      date: new Date().getTime()
    };

    return this.itemsCollection.add(message);

  }
}
