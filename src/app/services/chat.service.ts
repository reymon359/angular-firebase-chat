import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Message } from '../interfaces/message.interface';

import { map } from 'rxjs/operators';

// Firebase oauth
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Message>;

  public chats: Message[] = [];

  public user: any = {};

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(userInfo => {
      console.log('User state: ', userInfo); // The first time is null

      if (!userInfo) { return; }

      this.user.name = userInfo.displayName;
      this.user.uid = userInfo.uid;
      this.user.photoURL = userInfo.photoURL;

    });

  }
  login(provider: string) {
    if (provider === 'google') {

      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    } else {
      this.afAuth.auth.signInWithPopup(new auth.TwitterAuthProvider());

    }
  }
  logout() {
    this.user = {};
    this.afAuth.auth.signOut();
  }

  // We load the messages from the firebase collection
  loadMessages() {
    this.itemsCollection = this.afs.collection<Message>('chats', ref => ref.orderBy('date', 'desc')
      .limit(5));
    return this.itemsCollection.valueChanges().pipe(
      map((messages: Message[]) => {
        this.chats = [];
        for (const message of messages) {
          this.chats.unshift(message);
        }
        return this.chats;
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
