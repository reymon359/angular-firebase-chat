import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {
  message = '';
  element: any
  constructor(public chatService: ChatService) {
    this.chatService.loadMessages().subscribe(() => {
      setTimeout(() => {

        this.element.scrollTop = this.element.scrollHeight;
      }, 20);
    });
  }
  ngOnInit() {
    this.element = document.getElementById('app-messages');
  }
  sendMessage() {
    if (this.message.length === 0) {
      return;
    }
    this.chatService.addMessage(this.message)
      .then(() => this.message = '')
      .catch((err) => console.error('Error sending message', err));
  }
}
