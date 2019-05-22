import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent {
  message = '';
  constructor(public chatService: ChatService) {
    this.chatService.loadMessages().subscribe((messages: any[]) => {
      console.log(messages);
    })
  }

  sendMessage() {
    if (this.message.length === 0) {
      return;
    }
    this.chatService.addMessage(this.message)
      .then(() => this.message = '')
    .catch ((err) => console.error('Error sending message', err));

  }
}
